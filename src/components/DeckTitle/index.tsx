import { colors } from '@/styles/theme'
import { type DeckTitle as DeckTitleType } from '@/types/decks'
import { type FormEvent, useState } from 'react'
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
    <div>
      {
        isEditing
          ? (
          <form className='border-1 border-primary w-full flex justify-between p-2 ' onSubmit={handleOnSubmitTitle}>
            <input
              className='bg-transparent outline-none'
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
            className='p-2 border-1 border-transparent hover:border-primary w-full text-left flex justify-between items-center'
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
