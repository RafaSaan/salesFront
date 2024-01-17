import type { Credentials } from "@/interfaces";
import { useRouter } from "vue-router";
import { login } from '@/helpers/authHelper';
import axios from "axios";



export const useAuth = () => {
  const router = useRouter()
  
  const loginData = (credentials: Credentials):void => {
    login(credentials).then((data):void => {
      if (data.authenticated) {
        const userData = data.user;
        const prefix = `grp_token_${import.meta.env.VITE_FOLDER_PATH}`.replace('/', '_')
        window.sessionStorage.setItem(prefix, data.grp_token);
        window.sessionStorage.setItem(`${prefix}_expiration`, data.grp_token_expiration);
        window.sessionStorage.setItem(`${prefix}_permissions`, JSON.stringify(userData.permissions))
        axios.defaults.headers.common.Authorization = `Bearer ${data.grp_token}`;
        router.push('/dashboard');
      }
    })
  }

  return {
    loginData
}
}