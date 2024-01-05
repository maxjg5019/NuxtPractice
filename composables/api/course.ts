import type { course } from '~/server/models/courseModel';
export interface courseTableInfo {
  key: string;
  _id: string;
  name: string;
  teacher: string;
  courseDate: courseDate[];
}

export interface courseDate {
  weekDay: number;
  period: number;
}

export interface getAllCourseReponse {
  success: boolean;
  data: courseTableInfo[];
  message: string;
}

export interface studentCourseReponse {
  success: boolean;
  data: courseTableInfo[];
  message: string;
}

export interface signUpCourseReqeust {
  studentId: string;
  courseId: string;
}

export interface dropUpCourseReqeust {
  studentId: string;
  courseId: string;
}

export const addCourse = async (courseInfo: course) => {
  const data = await $fetch('/api/course/addCourse', {
    method: 'POST',
    body: courseInfo,
  });
  return data;
};

export const deleteCourse = async (courseId: string) => {
  const data = await $fetch('/api/course/deleteCourse', {
    method: 'POST',
    body: { courseId },
  });
  return data;
};

export const getAllCourse = async (): Promise<getAllCourseReponse> => {
  const data = await $fetch('/api/course/getAllCourse', {
    method: 'POST',
  });
  return data as getAllCourseReponse;
};

export const getStudentCourse = async (
  studentIdRequest: string
): Promise<studentCourseReponse> => {
  const reqeustData = { studentId: studentIdRequest };
  const data = await $fetch('/api/course/getStudentCourse', {
    method: 'POST',
    body: reqeustData,
  });
  return data as studentCourseReponse;
};

export const getAllStudentCourse = async () => {
  const data = await $fetch('/api/course/getAllStudentCourse', {
    method: 'POST',
  });
  return data; //TODO: 先做完課程資料(course) 建立再回來接資料
};

export const signUpCourse = async (
  studentIdRequest: string,
  courseIdRequest: string
) => {
  const reqeustData: signUpCourseReqeust = {
    studentId: studentIdRequest,
    courseId: courseIdRequest,
  };
  const data = await $fetch('/api/course/signUpCourse', {
    method: 'POST',
    body: reqeustData,
  });
  return data;
};

export const dropCourse = async (
  studentIdRequest: string,
  courseIdRequest: string
) => {
  const reqeustData: dropUpCourseReqeust = {
    studentId: studentIdRequest,
    courseId: courseIdRequest,
  };
  const data = await $fetch('/api/course/dropCourse', {
    method: 'POST',
    body: reqeustData,
  });
  return data;
};
