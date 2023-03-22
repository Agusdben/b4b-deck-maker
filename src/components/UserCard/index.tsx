import useUser from '@/hooks/useUser'
import { colors } from '@/styles/theme'
import UserIcon from '../Icons/UserIcon'

const UserProfile: React.FC = () => {
  const { user } = useUser()
  return (
    <div className='flex text-xl items-center gap-2 p-2'>
      <UserIcon fill={colors.primary} />
      <p>{user?.username}</p>
    </div>
  )
}

export default UserProfile
