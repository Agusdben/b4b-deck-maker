export interface User {
  id: string
  username: string
  token: string
}

export type UserToken = Pick<User, 'token'>
