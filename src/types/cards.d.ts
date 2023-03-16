export interface Card {
  id: string
  title: string
  description: string
  img: string
  affinity: string
  affinity_img: string
  type: string
}

export type CardTitle = Pick<Card, 'title'>
export type HandleQueryFn = ({ title }: CardTitle) => void
