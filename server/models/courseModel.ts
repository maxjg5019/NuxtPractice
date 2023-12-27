/**
 * @description: 課程 DB 資料格式
 * @param name - 課程名稱
 * @param teacher - 授課教師
 * @param courseDate - 課程時間
 */
export interface course {
  name: string;
  teacher: string;
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
