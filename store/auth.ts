import { defineStore } from 'pinia';

export const useLoginStore = defineStore('user', {
  state: () => {
    return {
      isLoggedIn: useCookie('isLoggedIn').value || false,
    };
  },
  actions: {
    Login() {
      const cookie = useCookie('isLoggedIn',{maxAge: 600});
      cookie.value = true.toString();
      this.isLoggedIn = true;
    },
    Logout() {
      const cookie = useCookie('isLoggedIn');
      cookie.value = false.toString();
      this.isLoggedIn = false;
    },
  },
});
