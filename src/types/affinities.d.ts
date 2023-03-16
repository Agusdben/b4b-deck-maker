import { type AFFINITIES_FILTER } from '@/constants/cardFilters'

export type Affinities = typeof AFFINITIES_FILTER[keyof typeof AFFINITIES_FILTER]

export type HandleAffinitySelectedFn = (affinity: Affinities) => void
