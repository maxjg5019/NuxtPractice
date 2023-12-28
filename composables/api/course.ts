import type { course } from '~/server/models/courseModel';

export interface courseTableInfo {
  key: string; //這個從DB取出資料後再加上去
  courseName: string;
  courseDate: courseDate[];
}

export interface courseDate {
  weekDay: number;
  coursePeriod: number;
}

export interface getAllCourseReponse {
  success: boolean;
  data: courseTableInfo[];
  message: string;
}

export const addCourse = async (courseInfo: course) => {
  console.log('getCourseTableData 新增課程的request', courseInfo);
  const data = await $fetch('/api/course/addCourse', {
    method: 'POST',
    body: courseInfo,
  });
  return data;
};

export const deleteCourse = async (courseInfo: course) => {
  console.log('getCourseTableData 刪除課程的request', courseInfo);
  const data = await $fetch('/api/course/deleteCourse', {
    method: 'POST',
    body: courseInfo,
  });
  return data;
};

export const getAllCourse = async (): Promise<getAllCourseReponse> => {
  const data = await $fetch('/api/course/getAllCourse', {
    method: 'POST',
  });
  return data as getAllCourseReponse;
};

export const getStudentCourse = async (studentID: string) => {
  console.log('學號', studentID);
  const data = await $fetch('/api/course/getStudentCourse', {
    method: 'POST',
    body: studentID,
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
