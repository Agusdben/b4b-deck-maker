import { MAX_CARDS } from '@/constants/decks'
import useModal from '@/hooks/useModal'
import { colors } from '@/styles/theme'
import { type DeckId, type Deck as DeckType } from '@/types/decks'
import Link from 'next/link'
import TrashBinIcon from '../Icons/TrashBinIcon'
import ModalDelete from '../ModalDelete'

interface Props {
  deck: DeckType
  onDelete: ({ id }: DeckId) => void
}
const Deck: React.FC<Props> = ({ deck, onDelete }) => {
  const modalDeleteDeck = useModal({ title: 'Delete deck' })

  return (
    <div key={deck.id} className='flex gap-1 p-2 bg-black rounded-md hover:shadow-md hover:shadow-primary transition-shadow'>
      <Link href={`/decks/${deck.id}`} className='flex-1 flex flex-col gap-2 overflow-hidden'>
        <p className='text-ellipsis whitespace-nowrap overflow-hidden text-xl'>{deck.title}</p>
        <p>Cards: {deck.total_cards}/{MAX_CARDS}</p>
      </Link>
      <button onClick={modalDeleteDeck.handleModal}>
        <TrashBinIcon fill={colors.primary}/>
      </button>
      <ModalDelete
        descriptions={[deck.title]}
        modal={modalDeleteDeck}
        type='deck' onCancel={modalDeleteDeck.handleModal}
        onDelete={() => { onDelete({ id: deck.id }) }}
      />
    </div>
  )
}

export default Deck
