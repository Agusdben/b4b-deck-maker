import { AFFINITIES_FILTER, TYPES_FILTERS } from '@/constants/cardFilters'
import { type HandleAffinitySelectedFn, type Affinities } from '@/types/affinities'
import { type HandleQueryFn } from '@/types/cards'
import { type CardTypes, type HandleCardTypesFn } from '@/types/types'
import { useState } from 'react'
import Select from '../Select'

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
    <div className='flex flex-col gap-2 items-center md:items-start md:flex-row'>
      <input
        className='bg-transparent self-stretch border-1 border-primary w-full px-4 py-2 outline-none'
        placeholder="Search card here"
        value={searchValue}
        onChange={handleOnchange}
      />
      <div className='text-black flex gap-4'>
        <Select
          label='Affinity'
          value={affinity}
          onChange={(evt) => { handleAffinity(evt.target.value as Affinities) }}
          values={Object.values(AFFINITIES_FILTER)}
        />
        <Select
          label='Type'
          value={type}
          onChange={(evt) => { handleType(evt.target.value as CardTypes) }}
          values={Object.values(TYPES_FILTERS)}
        />
      </div>
    </div>
  )
}

export default FilterCards
