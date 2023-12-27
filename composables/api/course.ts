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

export const addCourse = async (courseInfo: course) => {
  console.log('getCourseTableData 新增課程的request', courseInfo);
  const { data } = await useFetch('/api/course/addCourse', {
    method: 'POST',
    body: courseInfo,
  });
  return data.value;
};

export const deleteCourse = async (courseInfo: course) => {
  console.log('getCourseTableData 刪除課程的request', courseInfo);
  const { data } = await useFetch('/api/course/deleteCourse', {
    method: 'POST',
    body: courseInfo,
  });
  return data.value;
};

export const getAllCourse = async () => {
  const { data } = await useFetch('/api/course/getStudentCourse', {
    method: 'POST',
  });
  return data.value;
};

export const getStudentCourse = async (studentID: string) => {
  console.log('學號', studentID);
  const { data } = await useFetch('/api/course/getStudentCourse', {
    method: 'POST',
    body: studentID,
  });
  return data.value;
};

export const getCourseTableData = async (studentID: string) => {
  console.log('getCourseTableData 前端傳學號做查詢', studentID);
  const { data } = await useFetch('/api/course/getAllStudentCourse', {
    method: 'POST',
    body: studentID,
  });
  return data.value; //TODO: 先做完課程資料(course) 建立再回來接資料
};
