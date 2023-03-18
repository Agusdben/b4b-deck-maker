import { MAX_CARDS } from '@/constants/decks'
import { addCardToDeck, removeCardFromDeck } from '@/services/decksCard'
import { type CardId, type Card } from '@/types/cards'
import { type DeckTitle, type Deck } from '@/types/decks'
import { useState } from 'react'
import useUser from './useUser'
import { toast } from 'react-toastify'
import { updateTitle } from '@/services/decks'

interface Props {
  initialDeck: Deck
  initialDeckCards: Card[]
}

interface ReturnTypes {
  deckCards: Card[]
  cardsInQueue: CardId[]
  deck: Deck
  handleAddCardToDeck: (card: Card) => void
  handleRemoveCardFromDeck: (card: Card) => void
  handleUpdateTitle: ({ title }: DeckTitle) => void
}

const useDeck = ({ initialDeck, initialDeckCards }: Props): ReturnTypes => {
  const { user } = useUser()
  const [deckCards, setDeckCards] = useState(initialDeckCards)
  const [deck, setDeck] = useState(initialDeck)
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

  const handleUpdateTitle = ({ title }: DeckTitle): void => {
    if (user == null || title === '') return

    updateTitle({ id: deck.id, title, token: user?.token })
      .then(deck => {
        setDeck(deck)
        toast.success('Title updated')
      })
      .catch(error => {
        console.error(error)
        toast.error('Invalid title')
      })
  }

  return {
    deckCards,
    cardsInQueue,
    deck,
    handleAddCardToDeck,
    handleRemoveCardFromDeck,
    handleUpdateTitle
  }
}

export default useDeck
