import { addCardToDeck, removeCardFromDeck } from '@/services/decksCard'
import { type Card } from '@/types/cards'
import { type Deck } from '@/types/decks'
import { useState } from 'react'
import useUser from './useUser'

interface Props {
  deck: Deck
  initialDeckCards: Card[]
}

interface ReturnTypes {
  deckCards: Card[]
  handleAddCardToDeck: (card: Card) => void
  handleRemoveCardFromDeck: (card: Card) => void
}

const useDeck = ({ deck, initialDeckCards }: Props): ReturnTypes => {
  const { user } = useUser()
  const [deckCards, setDeckCards] = useState(initialDeckCards)

  const handleAddCardToDeck = (card: Card): void => {
    if (user == null) return

    addCardToDeck({ deckId: deck.id, cardId: card.id, token: user.token })
      .then((newCard) => {
        setDeckCards(currentCards => {
          return [...currentCards, newCard]
        })
      })
      .catch(error => { console.error(error.message) })
  }

  const handleRemoveCardFromDeck = (card: Card): void => {
    if (user == null) return

    removeCardFromDeck({ deckId: deck.id, cardId: card.id, token: user.token })
      .then((deletedCard) => {
        setDeckCards(currentCards => {
          return currentCards.filter(c => c.id !== deletedCard.id)
        })
      })
      .catch(error => { console.error(error.message) })
  }

  return {
    deckCards,
    handleAddCardToDeck,
    handleRemoveCardFromDeck
  }
}

export default useDeck
