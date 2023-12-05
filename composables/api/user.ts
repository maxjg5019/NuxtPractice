import { usertype } from '~/server/models/userModel';
import type { user } from '~/server/models/userModel';

export interface registerFormState {
  name: string;
  studentId: string;
  usertype: string;
  password: string;
}

export interface formState {
  studentId: string;
  password: string;
  userType: string;
}



export const userRegister = async (userData:registerFormState) => {

};

export const userLogin = async (userData:formState) => {
  
};

export const userLogout = async (studentId: string) => {
  
};
