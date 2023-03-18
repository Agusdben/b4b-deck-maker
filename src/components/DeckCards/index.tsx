import { MAX_CARDS } from '@/constants/decks'
import { type Card } from '@/types/cards'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Props {
  cards: Card[]
  onRemoveCard: (card: Card) => void
}

const DeckCards: React.FC<Props> = ({ cards, onRemoveCard }) => {
  const [currentCards, setCurrentCards] = useState<Array<Card | null>>(Array(MAX_CARDS).fill(null))

  useEffect(() => {
    setCurrentCards(currentCards => {
      for (let i = 0; i < currentCards.length; i++) {
        if (cards[i] !== undefined) {
          currentCards[i] = cards[i]
        } else {
          currentCards[i] = null
        }
      }
      return [...currentCards]
    })
  }, [cards])

  return (
    <div className='flex overflow-auto gap-4 py-2 md:h-full md:flex-col'>
      {
        currentCards.map((c, index) => {
          return (
            <button
              onClick={c !== null ? () => { onRemoveCard(c) } : () => {}} key={(c != null) ? c.id : index}
              className={'relative min-w-[230px] text-gray font-bold border-2 border-transparent hover:border-gray'}
            >
              <div className='relative z-10 flex items-center gap-2 bg-black/60'>
                <span>{index + 1}</span>
                {
                  c !== null && <Image src={c.affinity_img} alt={`Affinity ${c.affinity}`} width={16} height={16} className=''/>
                }
                <p className='w-max text-white text-left text-sm'>{(c != null) ? c.title : 'Empty'}</p>
              </div>
              {
                c !== null && <Image src={c.img} alt={`Card ${c.title}`} fill sizes='100%' className='object-cover'/>
              }
            </button>
          )
        })
      }
    </div>
  )
}

export default DeckCards
