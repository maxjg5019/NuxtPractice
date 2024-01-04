export interface courseTableType {
  key: string;
  period: string;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
}

export interface courseListTable {
  key: string;
  _id: string;
  name: string;
  teacher: string;
  courseTime: string;
}

export interface studentTableType {
  key: string;
  name: string;
  studentId: string;
}
