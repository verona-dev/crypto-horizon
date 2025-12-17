import { defineStore } from 'pinia';

export const useAuthStore = defineStore('AuthStore', {
       state: () => ({
           authModal: false,
       }),
    
    actions: {},
   });