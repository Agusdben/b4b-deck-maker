import { type UserIdAndToken } from '../types/user'
import { API_URL } from '../config/api'
import { type Deck } from '@/types/decks'
import { type ApiError } from '@/types/api'

const BASE_URL = `${API_URL}/decks`

export const getDecksByUserId = async ({ id, token }: UserIdAndToken): Promise<Deck[]> => {
  const URL = `${BASE_URL}/${id}`
  return await fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(async res => {
      if (!res.ok) {
        const error: ApiError = await res.json()
        console.error(error)
        throw new Error(error.code)
      }
      const decks: Deck[] = await res.json()
      return decks
    })
    .catch(error => {
      throw new Error(error.message)
    })
}
