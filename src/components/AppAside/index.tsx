import useUser from '@/hooks/useUser'
import { colors } from '@/styles/theme'
import Button from '../Button'
import UserIcon from '../Icons/UserIcon'
import XMarkIcon from '../Icons/XMarkIcon'

interface Props {
  onClose: () => void
}

const AppAside: React.FC<Props> = ({ onClose }) => {
  const { user, logout } = useUser()
  return (
    <aside className='relative z-30 bg-black-800 max-w-sm mr-auto h-full overflow-auto flex flex-col gap-4 py-2 px-4'>
      <button onClick={onClose} className='self-end p-2 text-2xl hover:brightness-50'>
        <XMarkIcon fill={colors.primary} />
      </button>
      <div className='flex text-xl items-center gap-2 p-2'>
        <UserIcon fill={colors.primary} />
        <p>{user?.username}</p>
      </div>
      <div className=''>
        <Button solid onClick={logout}>Logout</Button>
      </div>
    </aside>
  )
}

export default AppAside
