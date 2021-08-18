export interface IResponse<T> {
  success: boolean;
  error: string | null;
  message: string | null;
  data: T;
}

export interface ITerm {
  term4: string;
  term5: string;
  startDate: string; // 2020-01-13
  endDate: string;
  termFriendly: string; // "Spring 2020"
  attributeName:
    | 'PREVIOUS_TERM'
    | 'CURRENT_TERM'
    | 'NEXT_TERM'
    | 'NEXT_NEXT_TERM';
}

export interface ICourseRegistration {
  sid: string;
  course: string;
  section: string;
  courseId: string;
  term: string; // aligns with ITerm term5
}

export interface IUserInfo {
  personId: string;
  primaryDisplayName: string;
  preferredDisplayName: string;
  preferredGivenName: string;
  preferredSurName: string;
  primaryGivenName: string;
  primarySurName: string;
  clas: string; // Sic
  majors: string[];
  minors: string[];
  courseRegistrations: ICourseRegistration[];
}

export interface IClassExam {
  examDt: string;
  examStartTime: string;
  examEndTime: string;
  examBldg: string;
  examRoom: string;
}

export interface IInstructor {
  instructorName: string;
  instrRole: string;
  instrEmailAddr: string;
  schedPrintInstr: string;
}

export interface IGPA {
  cum_GPA: string;
  cur_GPA: string;
}

export interface ClassExam {
  examDt: string;
  examStartTime: string;
  examEndTime: string;
  examBldg: string;
  examRoom: string;
}

export interface Instructor {
  instructorName: string;
  instrRole: string;
  instrEmailAddr: string;
  schedPrintInstr: string;
}

type MeetingDay =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface ClassMtgPattern {
  classMtgNbr: string;
  bldg: string;
  bldgDescr: string;
  facilityType: string;
  descrLocation: string;
  room: string;
  meetingTimeStart: string;
  meetingTimeEnd: string;
  stndMtgPat: string;
  mtgPatStartDt: string;
  mtgPatEndDt: string;
  mon: string;
  tues: string;
  wed: string;
  thurs: string;
  fri: string;
  sat: string;
  sun: string;
  instructors: Instructor[];
  meetingDays: MeetingDay[];
}

export interface CourseV3 {
  emplid: string;
  classNbr: string;
  strm: string;
  institution: string;
  subject: string;
  classSection: string;
  catalogNbr: string;
  crseCareer: string;
  acadCareer: string;
  instrModeDescr: string;
  instructionMode: string;
  stdntEnrlStatus: string;
  enrlCap: string;
  wlReseqFlg: string;
  crseId: string;
  untTaken: string;
  sessionCode: string;
  classStartDt: string;
  classEndDt: string;
  classDescr: string;
  courseTitleLong: string;
  waitlistPos: string;
  topicDescr: string;
  crseGradeOff: string;
  enrlStatusReason: string;
  termDescr: string;
  waitCap: string;
  waitTot: string;
  endDtOee: string;
  startDtOee: string;
  crseOfferNbr: string;
  ssrComponent: string;
  url: string;
  campus: string;
  lms: string;
  lmsLink: string;
  classExams: ClassExam[];
  classMtgPatterns: ClassMtgPattern[];
  courseStartDate: string;
  course: string;
  sessionDescription: string;
}
