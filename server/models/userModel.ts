import { ObjectId } from "mongodb";

export interface user {
  name: string;
  studentId: string;
  usertype: usertype;
  password: string;
}

export enum usertype {
  professor,
  student,
}
