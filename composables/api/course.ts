import type { course } from '~/server/models/courseModel';
export interface courseTableInfo {
  key: string; //這個從DB取出資料後再加上去
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

export const addCourse = async (courseInfo: course) => {
  console.log('getCourseTableData 新增課程的request', courseInfo);
  const data = await $fetch('/api/course/addCourse', {
    method: 'POST',
    body: courseInfo,
  });
  return data;
};

export const deleteCourse = async (courseId: string) => {
  console.log('getCourseTableData 刪除課程的request', courseId);
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
  studentId: string
): Promise<studentCourseReponse> => {
  const data = await $fetch('/api/course/getStudentCourse', {
    method: 'POST',
    body: studentId,
  });
  return data as studentCourseReponse;
};

export const signUpCourse = async (
  studentIdRequest: string,
  courseIdRequest: string
) => {
  const reqeustData: signUpCourseReqeust = {
    studentId: studentIdRequest,
    courseId: courseIdRequest,
  };
  console.log('getCourseTableData 新增課程的request', reqeustData);
  const data = await $fetch('/api/course/signUpCourse', {
    method: 'POST',
    body: reqeustData,
  });
  return data;
};

export const getCourseTableData = async (studentID: string) => {
  console.log('getCourseTableData 前端傳學號做查詢', studentID);
  const data = await $fetch('/api/course/getAllStudentCourse', {
    method: 'POST',
    body: studentID,
  });
  return data; //TODO: 先做完課程資料(course) 建立再回來接資料
};
