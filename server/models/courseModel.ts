import { ObjectId } from "mongodb";

export interface course{
    //id: ObjectId;
    name: string;
    teacher: string;
    time: string; //節次
    credit: number;
    studentIdList: string[];
    semester: number; //上學期: 0, 下學期: 1
}