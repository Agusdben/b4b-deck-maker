import { type Card as CardType } from '@/types/cards'
import Image from 'next/image'
import React from 'react'

interface Props {
  card: CardType
}
const Card: React.FC<Props> = ({ card }) => {
  return (
    <div className='w-full max-w-[250px] mx-auto group bg-black p-2 rounded-md'>
      <div className='flex items-start justify-between'>
        <div>
          <h3>{card.title}</h3>
          <p className='text-gray'>{card.type}</p>
        </div>
        <Image src={card.affinity_img} alt={`Back 4 blood card with affinity ${card.affinity}`} width={16} height={16}/>
      </div>
      <div className='relative'>
        <Image src={card.img} alt={`Back 4 blood card ${card.title}`} width={330} height={500}/>
        <p className='absolute bottom-0 text-gray font-bold text-left group-hover:bg-black/50'>{card.description}</p>
      </div>
    </div>
  )
}

export default React.memo(Card)
