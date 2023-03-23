import { MAX_DECKS } from '@/constants/decks'
import { createNewDeck, deleteOneDeck, getDecksByUserId } from '@/services/decks'
import { type DeckId, type Deck } from '@/types/decks'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useUser from './useUser'

interface ReturnTypes {
  decks: Deck[]
  loading: boolean
  creatingDeck: boolean
  handleCreateNewDeck: () => void
  handleDeleteDeck: ({ id }: DeckId) => void
}

const useDecks = (): ReturnTypes => {
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [creatingDeck, setCreatingDeck] = useState(false)
  const [decks, setDecks] = useState<Deck[]>([])
  const router = useRouter()

  useEffect(() => {
    if (user === null) return

    getDecksByUserId({ id: user.id, token: user.token })
      .then(setDecks)
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [user])

  const handleCreateNewDeck = (): void => {
    if (user === null) return
    const title = `New deck #${decks.length}`

    if (decks.length === MAX_DECKS) {
      toast.error('Maximum number of decks reached')
    }

    setCreatingDeck(true)

    createNewDeck({ title, token: user.token })
      .then((deck) => {
        router.push(`/decks/${deck.id}`)
          .catch(error => {
            console.error(error)
          })
      })
      .catch(error => {
        console.error(error.message)
      })
      .finally(() => { setCreatingDeck(false) })
  }

  const handleDeleteDeck = ({ id }: DeckId): void => {
    if (user == null) return

    const decksBeforeDelete = [...decks]

    setDecks(currentDecks => currentDecks.filter(d => d.id !== id))

    deleteOneDeck({ id, token: user.token })
      .then(() => {
        toast.success('Deck removed')
      })
      .catch((error) => {
        console.error(error.message)
        toast.error('Failed to delete deck')
        setDecks(decksBeforeDelete)
      })
  }

  return {
    decks,
    loading,
    creatingDeck,
    handleCreateNewDeck,
    handleDeleteDeck
  }
}

export default useDecks
