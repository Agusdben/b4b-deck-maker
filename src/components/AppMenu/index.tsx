import { colors } from '@/styles/theme'
import XMarkIcon from '../Icons/XMarkIcon'

interface Props {
  onClose: () => void
}

const AppMenu: React.FC<Props> = ({ onClose }) => {
  return (
    <ul className="flex flex-col">
      <li>
        <button onClick={onClose}>
          <XMarkIcon fill={colors.primary}/>
        </button>
      </li>
    </ul>
  )
}

export default AppMenu
