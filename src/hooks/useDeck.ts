import { MAX_CARDS } from '@/constants/decks'
import { addCardToDeck, removeCardFromDeck } from '@/services/decksCard'
import { type CardId, type Card } from '@/types/cards'
import { type Deck } from '@/types/decks'
import { useState } from 'react'
import useUser from './useUser'
import { toast } from 'react-toastify'

interface Props {
  deck: Deck
  initialDeckCards: Card[]
}

interface ReturnTypes {
  deckCards: Card[]
  cardsInQueue: CardId[]
  handleAddCardToDeck: (card: Card) => void
  handleRemoveCardFromDeck: (card: Card) => void
}

const useDeck = ({ deck, initialDeckCards }: Props): ReturnTypes => {
  const { user } = useUser()
  const [deckCards, setDeckCards] = useState(initialDeckCards)
  const [cardsInQueue, setCardsInQueue] = useState<CardId[]>([])

  const removeCardFromQueue = (card: Card): void => {
    setCardsInQueue(actual => {
      return actual.filter(a => a.id !== card.id)
    })
  }
  const addCardToQueue = (card: Card): void => {
    setCardsInQueue(actual => {
      return [...actual, { id: card.id }]
    })
  }

  const handleAddCardToDeck = (card: Card): void => {
    if (user == null) return

    if (deckCards.length === MAX_CARDS) {
      toast.error('Deck is full')
      return
    }

    addCardToQueue(card)

    setDeckCards(currentCards => {
      return [...currentCards, card]
    })

    addCardToDeck({ deckId: deck.id, cardId: card.id, token: user.token })
      .catch(error => {
        console.error(error.message)
        toast.error('Failed to add card')
        setDeckCards(currentCards => {
          return currentCards.filter(c => c.id !== card.id)
        })
      })
      .finally(() => {
        removeCardFromQueue(card)
      })
  }

  const handleRemoveCardFromDeck = (card: Card): void => {
    if (user == null) return

    addCardToQueue(card)

    setDeckCards(currentCards => {
      return currentCards.filter(c => c.id !== card.id)
    })

    removeCardFromDeck({ deckId: deck.id, cardId: card.id, token: user.token })
      .catch(error => {
        console.error(error.message)
        toast.error('Failed to remove card')
        setDeckCards(currentCards => {
          return [...currentCards, card]
        })
      })
      .finally(() => {
        removeCardFromQueue(card)
      })
  }

  return {
    deckCards,
    cardsInQueue,
    handleAddCardToDeck,
    handleRemoveCardFromDeck
  }
}

export default useDeck
