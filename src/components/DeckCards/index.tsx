import { MAX_CARDS } from '@/constants/decks'
import { colors } from '@/styles/theme'
import { type CardId, type Card as CardType } from '@/types/cards'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from '../Card'
import EyeSlashIcon from '../Icons/EyeSlash'
import OpenEyeIcon from '../Icons/OpenEyeIcon'

interface Props {
  cards: CardType[]
  queue: CardId[]
  onRemoveCard: (card: CardType) => void
}

const DeckCards: React.FC<Props> = ({ cards, queue, onRemoveCard }) => {
  const [currentCards, setCurrentCards] = useState<Array<CardType | null>>(Array(MAX_CARDS).fill(null))
  const [showFullCards, setShowFullCards] = useState(false)

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

  const handleOnRemoveCard = (card: CardType | null): void => {
    if (card === null) return
    onRemoveCard(card)
  }

  const handleShowFullCardsChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = evt.target
    setShowFullCards(checked)
  }

  return (
    <div className='flex h-full flex-col gap-2 overflow-hidden'>
      <div className='flex w-full overflow-y-auto md:overflow-x-hidden gap-4 p-2 md:flex-1 md:flex-col'>
        {
          currentCards.map((c, index) => {
            const cardNumber = index + 1 < 10 ? `0${index + 1}` : index + 1
            const isInQueue = queue.some(q => q.id === c?.id)
            const animationDuration = Math.min(Math.max(Number(cardNumber) * 70), 200)
            return (
              <button
                disabled={isInQueue}
                key={c !== null ? c.id : index}
                onClick={() => { handleOnRemoveCard(c) }}
                className='text-left flex items-center border-2 rounded-md border-transparent hover:border-gray bg-black p-1 disabled:opacity-50'
              >
                <div
                  style={{ animationDuration: `${animationDuration}ms` }}
                  className='relative z-10 animate-to-left flex gap-2 items-center w-[230px]'
                >
                  {c === null
                    ? (<div className='w-full flex gap-2 items-center justify-center md:justify-start'>
                      <p>{cardNumber}</p>
                      <p>Empty</p>
                    </div>)
                    : (
                    <>
                      <div className={`m-auto overflow-hidden transition-max-height duration-500 ${showFullCards ? 'max-h-96' : 'max-h-0 absolute invisible'}`}>
                        <Card card={c}/>
                      </div>
                      <div className={`${showFullCards ? 'hidden' : 'flex'} h-full gap-2 overflow-hidden`}>
                        <p>{cardNumber}</p>
                        <Image className='object-contain' src={c.affinity_img} alt={`Affinity ${c.affinity}`} width={16} height={16} />
                        <p className=' whitespace-nowrap overflow-hidden text-ellipsis' >{c.title}</p>
                        <Image src={c.img} alt={`Card ${c.title}`} fill className='object-cover -z-10 opacity-30'/>
                      </div>
                    </>
                      )
                    }
                </div>
              </button>
            )
          })
        }
      </div>
      <div className='md:p-2 bg-black flex items-center justify-between'>
        <div className='flex items-center flex-col p-2 font-bold'>
          <p className='text-xl'>{cards.length}/{MAX_CARDS}</p>
          <small>Cards</small>
        </div>
        <label className={`flex items-center cursor-pointer w-fit border-1 gap-2 border-primary transition-colors rounded-full px-2 ${showFullCards ? 'bg-primary' : 'bg-transparent'}`}>
          <div className={`w-4 ${showFullCards ? 'brightness-0' : ''}`}>
            {showFullCards ? <OpenEyeIcon fill={colors.primary} /> : <EyeSlashIcon fill={colors.primary}/>}
          </div>
          <p>Show full cards</p>
          <input type='checkbox' className='hidden' checked={showFullCards} onChange={handleShowFullCardsChange}/>
        </label>
      </div>
    </div>
  )
}

export default DeckCards
