import { API_URL } from '@/config/api'
import { type Card } from '@/types/cards'

const BASE_URL = `${API_URL ?? ''}/cards`

export const getCards = async (): Promise<Card[]> => {
  return await fetch(BASE_URL)
    .then(async res => await res.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error)
      return []
    })
}
