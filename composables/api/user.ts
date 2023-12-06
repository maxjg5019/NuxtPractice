export interface registerFormState {
  name: string;
  studentId: string;
  password: string;
}

export interface loginformState {
  studentId: string;
  password: string;
}



export const userRegister = async (userData:registerFormState) => {

};

export const userLogin = async (userData:loginformState) => {
  
};

export const userLogout = async (studentId: string) => {
  
};
