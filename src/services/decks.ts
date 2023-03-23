import { type UserIdAndToken } from '../types/user'
import { API_URL } from '../config/api'
import { type GetOneDeckFn, type CreateNewDeckFn, type Deck, type UpdateDeckFn, type DeleteOneDeckFn } from '@/types/decks'
import { type ApiError } from '@/types/api'

const BASE_URL = `${API_URL ?? ''}/decks`

export const getDecksByUserId = async ({ id, token }: UserIdAndToken): Promise<Deck[]> => {
  const URL = `${BASE_URL}/user/${id}`
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

export const getOneDeck: GetOneDeckFn = async ({ id, token }) => {
  const URL = `${BASE_URL}/${id}`
  return await fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(async res => {
      if (!res.ok) {
        const error: ApiError = await res.json()
        throw new Error(error.message)
      }

      const deck: Deck = await res.json()
      return deck
    })
    .catch(error => {
      throw new Error(error.message)
    })
}

export const createNewDeck: CreateNewDeckFn = async ({ title, token }) => {
  return await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(async res => {
      if (!res.ok) {
        const error: ApiError = await res.json()
        throw new Error(error.code)
      }
      const deck: Deck = await res.json()
      return deck
    })
    .catch(error => {
      throw new Error(error.message)
    })
}

export const deleteOneDeck: DeleteOneDeckFn = async ({ id, token }) => {
  const URL = `${BASE_URL}/${id}`
  console.log(URL)
  await fetch(URL, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(async res => {
      if (!res.ok) {
        const error: ApiError = await res.json()
        throw new Error(error.message)
      }
    })
    .catch(error => {
      throw new Error(error.message)
    })
}

export const updateTitle: UpdateDeckFn = async ({ id, title, token }) => {
  const URL = `${BASE_URL}/${id}`
  return await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(async res => {
      if (!res.ok) {
        const error: ApiError = await res.json()
        throw new Error(error.message)
      }
      const deck: Deck = await res.json()
      return deck
    })
    .catch(error => {
      throw new Error(error.message)
    })
}
