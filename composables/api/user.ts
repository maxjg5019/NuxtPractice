export interface registerFormState {
  name: string;
  studentId: string;
  password: string;
}

export interface loginformState {
  studentId: string;
  password: string;
}

export const userRegister = async (userData: registerFormState) => {};

export const userLogin = async (userData: loginformState) => {
  console.log('userData前端', userData);
  const { data } = await useFetch('/api/user/login', {
    method: 'POST',
    body: userData,
  });
  return data.value?.success;
};

export const userLogout = async (studentId: string) => {};
