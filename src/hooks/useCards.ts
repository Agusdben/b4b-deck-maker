import { AFFINITIES_FILTER, TYPES_FILTERS } from '@/constants/cardFilters'
import { type HandleAffinitySelectedFn, type Affinities } from '@/types/affinities'
import { type Card, type HandleQueryFn } from '@/types/cards'
import { type HandleCardTypesFn, type CardTypes } from '@/types/types'
import { useMemo, useState } from 'react'

interface Props {
  cards: Card[]
}

interface ReturnTypes {
  cards: Card[]
  query: string
  handleQuery: HandleQueryFn
  handleAffinitySelected: HandleAffinitySelectedFn
  handleCardTypeSelected: HandleCardTypesFn
}

const useCards = ({ cards }: Props): ReturnTypes => {
  const [query, setQuery] = useState('')
  const [affinitySelected, setAffinitySelected] = useState<Affinities>(AFFINITIES_FILTER.ALL)
  const [cardTypeSelected, setCardTypeSelected] = useState<CardTypes>(TYPES_FILTERS.ALL)

  const handleQuery: HandleQueryFn = ({ title }) => {
    setQuery(title)
  }

  const handleAffinitySelected: HandleAffinitySelectedFn = (affinity) => {
    setAffinitySelected(affinity)
  }

  const handleCardTypeSelected: HandleCardTypesFn = (type) => {
    setCardTypeSelected(type)
  }

  const filteredCards = useMemo(() => {
    return cards.filter(c => (
      (c.title.toLowerCase().includes(query.toLowerCase()) || query === '')) &&
      (c.affinity.toLowerCase() === affinitySelected.toLowerCase() || affinitySelected === AFFINITIES_FILTER.ALL) &&
      (c.type.toLowerCase() === cardTypeSelected.toLowerCase() || cardTypeSelected === TYPES_FILTERS.ALL)
    )
  }, [cards, query, affinitySelected, cardTypeSelected])

  return {
    cards: filteredCards,
    query,
    handleQuery,
    handleAffinitySelected,
    handleCardTypeSelected
  }
}

export default useCards
