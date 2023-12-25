
export interface course{
    //id: ObjectId;
    name: string; //課程名稱 主鍵
    teacher: string; //授課教師
    weekDay: number; //星期
    period: number; //節次
    credit: number; //學分
    semester: number; //上學期: 0, 下學期: 1
}
export interface studentCourse {
    courseList: courseTableInfoDB[] ; //學生修的每一堂 課程資料
    studentId: string; //學號 外鍵
  }
  
  interface courseTableInfoDB {
    courseName: string; //課程名稱 外鍵
    courseDate: courseDate[];
  }
  
  interface courseDate {
    weekDay: number; //星期
    period: number; //節次
  }
  