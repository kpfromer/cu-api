import * as puppeteer from "puppeteer";
import {
  IResponse,
  ITerm,
  ICourseRegistration,
  IUserInfo,
  IInstructor,
  ICourse,
  IGPA,
} from "./types";

const buffPortalUrl = "https://buffportal.colorado.edu/";
const userUrl = "https://buffportal.colorado.edu/usews/api/v1/profile/v3";
const termUrl = "https://buffportal.colorado.edu/usews/api/v1/terms";
const gpaUrl = "https://buffportal.colorado.edu/usews/api/v1/gpa/all";

export class CUSession {
  private browser?: puppeteer.Browser;
  async init(
    username: string,
    password: string,
    options?: puppeteer.LaunchOptions
  ): Promise<this> {
    this.browser = await puppeteer.launch(options);
    const page = await this.browser.newPage();
    await page.goto(buffPortalUrl);
    await page.waitForSelector("button[type='submit']");
    await page.type("input[id='username']", username); //   await page.screenshot({ path: "example.png" });
    await page.type("input[id='password']", password);
    await page.click("button[type='submit']");

    await page.waitForSelector(".responsiveBuff");

    await page.close();
    return this;
  }

  private async getJson<T>(url: string): Promise<T> {
    if (this.browser) {
      const page = await this.browser.newPage();
      const [response] = await Promise.all([
        page.waitForResponse((res) => res.url() === url),
        page.goto(url),
      ]);
      const json = await response?.json();
      await page.close();
      return json as T;
    }
    throw new Error("Invalid session. Try logging in!");
  }

  async getUserData(): Promise<IUserInfo> {
    return await this.getJson<IUserInfo>(userUrl);
  }

  async getTermData(): Promise<ITerm[]> {
    return (await this.getJson<IResponse<ITerm[]>>(termUrl)).data;
  }

  async getGPA(): Promise<IGPA> {
    return (await this.getJson<IResponse<IGPA>>(gpaUrl)).data;
  }

  async getClassTermData(term4: string): Promise<Map<string, ICourse>> {
    const json = await this.getJson<
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

  async close() {
    if (this.browser) this.browser.close();
  }
}
