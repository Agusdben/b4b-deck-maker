import { type Card } from './cards'
import { type UserToken } from './user'

export interface Deck {
  id: string
  title: string
  id_user: string
  total_cards: number
}

export type DeckTitle = Pick<Deck, 'title'>
export type DeckId = Pick<Deck, 'id'>

export interface CreateNewDeck extends DeckTitle, UserToken {}
export interface DeckIdAndToken extends DeckId, UserToken {}

export interface AddAndRemoveCardDeck {
  cardId: string
  deckId: string
  token: string
}

export type CreateNewDeckFn = ({ title, token }: CreateNewDeck) => Promise<Deck>
export type GetCardsByDeckIdFn = ({ id, token }: DeckIdAndToken) => Promise<Card[]>
export type GetOneDeckFn = ({ id, token }: DeckIdAndToken) => Promise<Deck>
