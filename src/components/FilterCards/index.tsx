import { AFFINITIES_FILTER, TYPES_FILTERS } from '@/constants/cardFilters'
import { type HandleAffinitySelectedFn, type Affinities } from '@/types/affinities'
import { type HandleQueryFn } from '@/types/cards'
import { type CardTypes, type HandleCardTypesFn } from '@/types/types'
import { useState } from 'react'

interface Props {
  onQueryChange: HandleQueryFn
  onAffinityChange: HandleAffinitySelectedFn
  onCardTypeChange: HandleCardTypesFn
}

const FilterCards: React.FC<Props> = ({ onQueryChange, onAffinityChange, onCardTypeChange }) => {
  const [searchValue, setSearchValue] = useState('')
  const [affinity, setAffinity] = useState<Affinities>(AFFINITIES_FILTER.ALL)
  const [type, setType] = useState<CardTypes>(TYPES_FILTERS.ALL)

  const handleOnchange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(evt.target.value)
    onQueryChange({ title: evt.target.value })
  }

  const handleAffinity = (affinity: Affinities): void => {
    setAffinity(affinity)
    onAffinityChange(affinity)
  }

  const handleType = (type: CardTypes): void => {
    setType(type)
    onCardTypeChange(type)
  }

  return (
    <div>
      <input
        className='bg-transparent border-1 border-primary w-full px-4 py-2 outline-none'
        placeholder="Search card here"
        value={searchValue}
        onChange={handleOnchange}
      />
      <div className='text-black'>
        <select value={affinity} onChange={(evt) => { handleAffinity(evt.target.value as Affinities) }}>
          {
            Object.values(AFFINITIES_FILTER).map(affinity => <option key={affinity} value={affinity}>{affinity}</option>)
          }
        </select>
        <select value={type} onChange={(evt) => { handleType(evt.target.value as CardTypes) }}>
          {
            Object.values(TYPES_FILTERS).map(type => <option key={type} value={type}>{type}</option>)
          }
        </select>
      </div>
    </div>
  )
}

export default FilterCards
