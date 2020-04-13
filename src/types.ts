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
    | "PREVIOUS_TERM"
    | "CURRENT_TERM"
    | "NEXT_TERM"
    | "NEXT_NEXT_TERM";
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

export interface IInstructor {
  name: string;
  email: string;
  role: any; // todo
}

export interface ICourse {
  personId: string;
  term4: string;
  courseSubject: string; // PHYS
  courseId: string;
  courseOfferNumber: string;
  courseSection: string; // 302
  courseNumber: string; // 1140
  courseTitle: string; // Experimental Physics
  courseCareer: string;
  credits: string; // 0
  lms: string | null; // moodle/canvas
  lmsLink: string | null;
  campus: string;
  facilityType: string;
  descrLocation: string; // ECCR 151
  shortBuildingName: string; // ECCR
  fullBuildingName: string; // Engr Cntr - Classroom
  days: string; // MWF
  courseStartDate: string; // 2020-01-13
  courseStopDate: string; // 2020-04-30
  courseStartTime: string; // 18:0
  courseStopTime: string; // 18:50
  roomNumber: string; // 151
  courseSession: string;
  courseSessionDescription: string;
  instructors: IInstructor[];
}

export interface IGPA {
  cum_GPA: string;
  cur_GPA: string;
}
