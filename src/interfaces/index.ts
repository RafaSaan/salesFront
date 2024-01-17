export interface AuthInfo {
  authenticated: boolean
  grp_token: string
  grp_token_expiration: string
  user: User
}

interface User {
  id: number
  email: string
  username: string
  name: string
  first_name?: string
  last_name?: string
  permissions: string[]
  profile_id: number
  profile: string
}

export interface Credentials {
  username: string
  password: string
}