import { ObjectId } from "mongodb";

export interface course{
    //id: ObjectId;
    name: string; //課程名稱
    teacher: string; //授課教師
    period: string; //節次
    credit: number; //學分
    // studentIdList: string[];
    semester: number; //上學期: 0, 下學期: 1
}