import type { courseTableInfo, courseDate } from '~/composables/api/course';
import type { courseTableType } from '~/types/tableTypes';
import { NTUTcoursePeriod } from '~/constants/tableConstants';

export const transformRawCourseData = (courseData: courseTableInfo[]) => {
  return courseData.map((course: courseTableInfo, index: number) => {
    return {
      key: (index + 1).toString(),
      _id: course._id,
      name: course.name.concat(' - ', course.teacher),
      teacher: course.teacher,
      courseDate: course.courseDate.map((date: courseDate) => {
        return {
          weekDay: date.weekDay,
          period: date.period,
        };
      }),
    };
  });
};

export const dataToTable = (
  courseIndos: courseTableInfo[]
): courseTableType[] => {
  const tableData: courseTableType[] = [];

  //初始化每周的節次表
  for (let i = 0; i < NTUTcoursePeriod.length; i++) {
    tableData.push({
      key: i.toString(),
      period: (i + 1).toString(),
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    });
  }

  //分別將課程資料填入對應的節次表
  courseIndos.forEach((eachCourse) => {
    eachCourse.courseDate.forEach((eachCourseDate) => {
      switch (eachCourseDate.weekDay) {
        case 1:
          tableData[eachCourseDate.period - 1].monday.push(eachCourse.name);
          break;
        case 2:
          tableData[eachCourseDate.period - 1].tuesday.push(eachCourse.name);
          break;
        case 3:
          tableData[eachCourseDate.period - 1].wednesday.push(eachCourse.name);
          break;
        case 4:
          tableData[eachCourseDate.period - 1].thursday.push(eachCourse.name);
          break;
        case 5:
          tableData[eachCourseDate.period - 1].friday.push(eachCourse.name);
          break;
      }
    });
  });
  //最後再把節次轉換成北科正確的格式
  tableData.forEach((item, index) => {
    item.period = NTUTcoursePeriod[index];
  });
  return tableData;
};
