export interface User {
  id: string
  username: string
  token: string
}

export type UserToken = Pick<User, 'token'>
export type UserId = Pick<User, 'id'>
export type UserIdAndToken = Pick<User, 'id' | 'token'>
