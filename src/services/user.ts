import { API_URL } from '@/config/api'
import { type LoginFormFields } from '@/types/login'
import { type User, type UserToken } from '@/types/user'
import { handleErrors } from './utilities'

const BASE_URL = `${API_URL}/users`

export const loginWithToken = async ({ token }: UserToken): Promise<User> => {
  return await fetch(
    `${BASE_URL}/loginToken`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(async res => {
      if (!res.ok) {
        throw new Error(`Filed with status code ${res.status}`)
      }
      const data: User = await res.json()
      return data
    })
    .catch(error => {
      throw new Error(error)
    })
}

export const loginWithUsernameAndPassword = async (body: LoginFormFields): Promise<User> => {
  return await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(async res => {
    if (!res.ok) {
      const { message } = await res.json()
      throw new Error(message)
    }
    const data: User = await res.json()
    return data
  }).catch(error => {
    return handleErrors(error)
  })
}

// export const registerNewUser = async (body: RegisterFormValues): Promise<void> => {
//   await fetch(`${API_URL}/signin`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   })
//     .then(async (res) => {
//       if (!res.ok) {
//         const { error } = await res.json()
//         throw new Error(error)
//       }
//     })
//     .catch(error => handleErrors(error))
// }
