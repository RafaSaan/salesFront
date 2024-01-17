import axios from "axios";
import type { Credentials, AuthInfo } from "@/interfaces";

const api = import.meta.env.VITE_API_ENDPOINT

export const login = async(credentials: Credentials):Promise<AuthInfo> => {
  const loginData:AuthInfo = {
    authenticated: false,
    grp_token: '',
    grp_token_expiration: '',
    user: {
      id: 0,
      email: '',
      username: '',
      name: '',
      first_name: '',
      last_name: '',
      permissions: [],
      profile_id: 0,
      profile: '',
    },
  }
  
  try {
    const url = `${api}/login`
    const {data} = await axios.post(url, {
      username: credentials.username,
      password: credentials.password
    })

    loginData.authenticated = data.authenticated
    loginData.grp_token = data?.grp_token
    loginData.grp_token_expiration = data?.grp_token_expiration
    loginData.user = data?.user

  } catch {
    console.log('error')
  }

  return loginData
}