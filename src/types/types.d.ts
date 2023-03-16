import { type TYPES_FILTERS } from '@/constants/cardFilters'

export type CardTypes = typeof TYPES_FILTERS[keyof typeof TYPES_FILTERS]

export type HandleCardTypesFn = (type: CardTypes) => void
