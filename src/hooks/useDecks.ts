import { createNewDeck, getDecksByUserId } from '@/services/decks'
import { type Deck } from '@/types/decks'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useUser from './useUser'

interface ReturnTypes {
  decks: Deck[]
  loading: boolean
  handleCreateNewDeck: () => void
}

const useDecks = (): ReturnTypes => {
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
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
  }

  return {
    decks,
    loading,
    handleCreateNewDeck
  }
}

export default useDecks
