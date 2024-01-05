import { defineStore } from 'pinia';

export const useLoginStore = defineStore('user', {
  state: () => {
    return {
      isLoggedIn: useCookie('isLoggedIn').value || false,
      studentID: useCookie('studentID').value || null,
    };
  },
  actions: {
    Login(studentID: string) {
      const cookie = useCookie('isLoggedIn'); //,{maxAge: 600}
      const studentIDCookie = useCookie('studentID');

      cookie.value = true.toString();
      studentIDCookie.value = studentID;

      this.isLoggedIn = true;
      this.studentID = studentID.toString();
    },
    Logout() {
      const cookie = useCookie('isLoggedIn');
      const studentIDCookie = useCookie('studentID');


      cookie.value = false.toString();
      studentIDCookie.value = null;

      this.isLoggedIn = false;
      this.studentID = null;
    },
  },
});

