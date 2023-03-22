import useUser from '@/hooks/useUser'
import { colors } from '@/styles/theme'
import Link from 'next/link'
import Button from '../Button'
import XMarkIcon from '../Icons/XMarkIcon'
import UserProfile from '../UserCard'

interface Props {
  onClose: () => void
}

const AppAside: React.FC<Props> = ({ onClose }) => {
  const { logout } = useUser()
  return (
    <aside className='relative z-30 bg-black-800 max-w-sm mr-auto h-full overflow-auto flex flex-col gap-4 py-2 px-4'>
      <button onClick={onClose} className='self-end p-2 text-2xl hover:brightness-50'>
        <XMarkIcon fill={colors.primary} />
      </button>
      <UserProfile />
      <ul className='flex flex-col gap-4 text-center [&_li]:p-2 hover:[&_li]:text-primary'>
        <li>
          <Link className='block' href='/'>My decks</Link>
        </li>
      </ul>
      <Button solid onClick={logout}>Logout</Button>
    </aside>
  )
}

export default AppAside
