// import { useLoginStore } from '@/store/auth';

// const loginStore = useLoginStore();
export interface registerFormState {
  name: string;
  studentId: string;
  password: string;
}

export interface loginformState {
  studentId: string;
  password: string;
}

export interface getAllStudentReponse {
  success: boolean;
  data: studentList[];
  message: string;
}

export interface studentList {
  name: string;
  studentId: string;
}

export const userRegister = async (registerData: registerFormState) => {
  console.log('registerData前端', registerData);
  const data = await $fetch('/api/user/register', {
    method: 'POST',
    body: registerData,
  });
  return data;
};

export const userLogin = async (loginData: loginformState) => {
  console.log('loginData前端', loginData);
  const data = await $fetch('/api/user/login', {
    method: 'POST',
    body: loginData,
  });
  return data;
};

export const getAllStudents = async (): Promise<getAllStudentReponse> => {
  const data = await $fetch('/api/user/getAllStudents', {
    method: 'POST',
  });
  return data as getAllStudentReponse;
};

export const userLogout = async () => {
  //loginStore.Logout(); 鳳梨不能在這邊呼叫 所以直接實作在 layouts/deafult.vue
};
