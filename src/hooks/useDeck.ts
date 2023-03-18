import { MAX_CARDS } from '@/constants/decks'
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
  isLoading: boolean
  handleAddCardToDeck: (card: Card) => void
  handleRemoveCardFromDeck: (card: Card) => void
}

const useDeck = ({ deck, initialDeckCards }: Props): ReturnTypes => {
  const { user } = useUser()
  const [deckCards, setDeckCards] = useState(initialDeckCards)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddCardToDeck = (card: Card): void => {
    if (user == null) return

    if (deckCards.length === MAX_CARDS) {
      // add feedback
      return
    }

    setIsLoading(true)

    setDeckCards(currentCards => {
      return [...currentCards, card]
    })

    addCardToDeck({ deckId: deck.id, cardId: card.id, token: user.token })
      .then(() => {
        // add message when is added
      })
      .catch(error => {
        console.error(error.message)
        setDeckCards(currentCards => {
          return currentCards.filter(c => c.id !== card.id)
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleRemoveCardFromDeck = (card: Card): void => {
    if (user == null) return

    setIsLoading(true)

    setDeckCards(currentCards => {
      return currentCards.filter(c => c.id !== card.id)
    })

    removeCardFromDeck({ deckId: deck.id, cardId: card.id, token: user.token })
      .then((deletedCard) => {
        // add message
      })
      .catch(error => {
        console.error(error.message)
        setDeckCards(currentCards => {
          return [...currentCards, card]
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    deckCards,
    isLoading,
    handleAddCardToDeck,
    handleRemoveCardFromDeck
  }
}

export default useDeck
