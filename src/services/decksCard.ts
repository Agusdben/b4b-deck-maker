import { API_URL } from '@/config/api'
import { type ApiError } from '@/types/api'
import { type Card } from '@/types/cards'
import { type AddAndRemoveCardDeck, type GetCardsByDeckIdFn } from '@/types/decks'

const BASE_URL = `${API_URL}/decks_cards`

export const getCardsByDeckId: GetCardsByDeckIdFn = async ({ id, token }) => {
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
      const cards: Card[] = await res.json()
      return cards
    })
    .catch(error => {
      throw new Error(error.message)
    })
}

export const addCardToDeck = async ({ deckId, cardId, token }: AddAndRemoveCardDeck): Promise<Card> => {
  return await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({ deckId, cardId }),
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
      const card: Card = await res.json()
      return card
    })
    .catch(error => {
      throw new Error(error.message)
    })
}

export const removeCardFromDeck = async ({ cardId, deckId, token }: AddAndRemoveCardDeck): Promise<Card> => {
  const URL = `${BASE_URL}/${deckId}/${cardId}`
  return await fetch(URL, {
    method: 'DELETE',
    body: JSON.stringify({ deckId, cardId }),
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
      const card: Card = await res.json()
      return card
    })
    .catch(error => {
      throw new Error(error.message)
    })
}
