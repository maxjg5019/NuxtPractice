export interface user {
  email: string;
  name: string;
  type: usertype;
  studentId: string;
}

export enum usertype {
  professor,
  master,
  bechelor,
}
