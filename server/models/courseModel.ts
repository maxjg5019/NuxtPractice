/**
 * @description: 課程 DB 資料格式
 * @param name - 課程名稱
 * @param teacher - 授課教師
 * @param weekDay - 星期
 * @param period - 節次
 */
export interface course{
    name: string;
    teacher: string;
    courseDate: courseDate[]
}
/**
 * @description: 學生修課 DB 資料格式
 * @param courseList - 學生修的每一堂 課程資料
 * @param studentId - 學號
 */
export interface studentCourse {
    courseList: courseTableInfoDB[] ;
    studentId: string;
  }
  /**
 * @description: 學生修的每一堂 課程資料
 * @param courseName - 課程名稱
 * @param courseDate - 課程時間
 */
  interface courseTableInfoDB {
    courseName: string;
    courseDate: courseDate[];
  }
    /**
 * @description: 課程時間
 * @param weekDay - 星期
 * @param period - 節次
 */
  interface courseDate {
    weekDay: number;
    period: number;
  }
  