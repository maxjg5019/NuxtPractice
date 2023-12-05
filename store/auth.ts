import { defineStore } from 'pinia';

interface UserState {
  isAuthenticated: boolean;
  data: any; // 您可以替換為更具體的用戶數據類型
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthenticated: false,
    data: null,
  }),
  actions: {
    login(userData: any) {
      this.isAuthenticated = true;
      this.data = userData;
    },
    logout() {
      this.isAuthenticated = false;
      this.data = null;
    },
  },
});

export const useAuthStore = defineStore('auth', {});