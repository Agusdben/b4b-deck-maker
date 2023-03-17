import { getDecksByUserId } from '@/services/decks'
import { type Deck } from '@/types/decks'
import { useEffect, useState } from 'react'
import useUser from './useUser'

interface ReturnTypes {
  decks: Deck[]
  loading: boolean
}

const useDecks = (): ReturnTypes => {
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [decks, setDecks] = useState<Deck[]>([])

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

  return {
    decks,
    loading
  }
}

export default useDecks
