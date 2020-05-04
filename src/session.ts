import * as path from 'path';
import * as cheerio from 'cheerio';
import * as qs from 'querystring';
import * as request from 'superagent';
import { IUserInfo, ITerm, IResponse, IGPA, ICourse } from './types';
// import * as moment from 'moment';

const rootCas = require('ssl-root-cas').create();
// https://stackoverflow.com/questions/31673587/error-unable-to-verify-the-first-certificate-in-nodejs

rootCas.addFile(path.resolve(__dirname, 'intermediate.pem'));

function getFormValues(
  $: CheerioStatic,
  values: string[] = []
): { [key: string]: string } {
  Object.values;
  return values.reduce(
    (prev, key) => ({
      ...prev,
      [key]: $(`input[name='${key}']`).attr('value')
    }),
    {}
  );
}

const userUrl = 'https://buffportal.colorado.edu/usews/api/v1/profile/v3';
const termUrl = 'https://buffportal.colorado.edu/usews/api/v1/terms';
const gpaUrl = 'https://buffportal.colorado.edu/usews/api/v1/gpa/all';

export class CUSession {
  // superagent maintains cookies needed for cu login
  private agent: request.SuperAgentStatic &
    request.Request = request.agent().ca(rootCas);
  private isLoggedIn = false;

  //   private parseDate = (date: string) => date;
  //   private parseNumber = (number: string) => parseFloat(number);

  get loggedIn() {
    return this.isLoggedIn;
  }

  //   constructor(options?: (string extends D & number extends N) ? IOptions<D, N>? : IOptions<D, N>) {
  //     if (options?.date) {
  //       this.parseDate = options.date;
  //     }
  //     if (options?.number) {
  //       this.parseNumber = options.number;
  //     }
  //   }

  async init(username: string, password: string): Promise<void> {
    await this.agent
      .get('https://buffportal.colorado.edu/')
      .then((res) => {
        // console.log(res.text);
        const $ = cheerio.load(res.text);
        return this.agent
          .post(`https://fedauth.colorado.edu${$('form').attr('action')}`)
          .accept('text/html,application/xhtml+xml,application/xml')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send(
            qs.stringify({
              j_username: username,
              j_password: password,
              _eventId_proceed: 'Log In'
            })
          );
      })
      .then((res) => {
        const $ = cheerio.load(res.text);
        const data = getFormValues($, ['RelayState', 'SAMLResponse']);
        return this.agent
          .post($('form').attr('action') as string)
          .accept('text/html,application/xhtml+xml,application/xml')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send(data);
        // return agent.post();
      })
      .then(() => {
        this.isLoggedIn = true;
      });
  }

  async json<T>(url: string): Promise<T> {
    return await this.agent.get(url).then((res) => JSON.parse(res.text));
  }

  async userData(): Promise<IUserInfo> {
    return await this.json(userUrl);
  }

  async termData(): Promise<ITerm[]> {
    return (await this.json<IResponse<ITerm[]>>(termUrl)).data;
  }

  async GPA(): Promise<IGPA> {
    return (await this.json<IResponse<IGPA[]>>(gpaUrl)).data[0];
  }

  async classTermData(term4: string): Promise<Map<string, ICourse>> {
    const json = await this.json<
      IResponse<
        { courseDate: string; holidayName: string; courses: ICourse[] }[]
      >
    >(`https://buffportal.colorado.edu/usews/api/v1/schedule/v2/term/${term4}`);

    return json.data.reduce((courses, data) => {
      data.courses.forEach((course) =>
        courses.set(`${course.courseId}-${course.courseSection}`, course)
      );
      return courses;
    }, new Map<string, ICourse>());
  }
}
