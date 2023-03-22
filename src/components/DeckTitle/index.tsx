import { colors } from '@/styles/theme'
import { type DeckTitle as DeckTitleType } from '@/types/decks'
import { type FormEvent, useState } from 'react'
import NoteIcon from '../Icons/NoteIcon'
import PenToSquareIcon from '../Icons/PenToSquareIcon'

interface Props extends DeckTitleType {
  onUpdateTitle: ({ title }: DeckTitleType) => void
}

const DeckTitle: React.FC<Props> = ({ title, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [titleValue, setTitleValue] = useState(title)

  const handleOnTitleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setTitleValue(evt.target.value)
  }

  const handleTitleOnBlur = (): void => {
    handleOnSubmitTitle()
  }

  const handleOnSubmitTitle = (evt?: FormEvent<HTMLFormElement>): void => {
    evt?.preventDefault()
    const newTitle = titleValue.trim()
    if (newTitle === '' || title === newTitle) {
      setTitleValue(title)
      setIsEditing(false)
      return
    }
    onUpdateTitle({ title: newTitle })
    setIsEditing(false)
  }

  return (
    <div className='border-1 p-2 gap-2 border-primary bg-black flex  items-center '>
      <NoteIcon fill={colors.primary}/>
      {
        isEditing
          ? (
          <form className='w-full flex justify-between ' onSubmit={handleOnSubmitTitle}>
            <input
              className='bg-black-800 outline-none flex-1'
              type="text"
              value={titleValue}
              onChange={handleOnTitleChange}
              required
              placeholder='Type a valid title'
              onBlur={handleTitleOnBlur}
              autoFocus
            />
            <button type='submit'>
              <PenToSquareIcon fill={colors.primary}/>
            </button>
          </form>
            )
          : (
            <button
            className='w-full text-left flex justify-between items-center'
              onClick={() => { setIsEditing(!isEditing) }}
            >
              <p>{title}</p>
              <PenToSquareIcon fill={colors.primary}/>
            </button>
            )
      }
    </div>
  )
}

export default DeckTitle
