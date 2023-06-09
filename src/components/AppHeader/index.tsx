import useUser from '@/hooks/useUser'
import { colors } from '@/styles/theme'
import Link from 'next/link'
import { useState } from 'react'
import AppAside from '../AppAside'
import BarsIcon from '../Icons/BarsIcon'
import UserProfile from '../UserCard'

const AppHeader: React.FC = () => {
  const { user } = useUser()
  const [toggle, setToggle] = useState(false)

  const handleToggle = (): void => {
    setToggle(!toggle)
  }

  return (
    <header className='flex items-center py-2 relative'>
      {
        user !== null && (
          <>
            <button onClick={handleToggle} className='flex p-2 gap-1 items-center hover:brightness-50 text-2xl'>
              <BarsIcon fill={colors.primary}/>
            </button>
            <div className={`fixed z-30 top-0 overflow-hidden w-screen h-screen transition-left ${toggle ? 'left-0' : '-left-full'}`}>
              <AppAside onClose={handleToggle}/>
              <button className='w-screen h-screen absolute top-0 left-0' onClick={handleToggle}/>
            </div>
          </>
        )
      }
     <h1 className='p-2 text-xl'>
      <Link href='/'>B4B Deck Maker</Link>
     </h1>
     {
      user !== null && (
        <div className='ml-auto hidden md:block'>
          <UserProfile />
        </div>
      )
     }
    </header>
  )
}

export default AppHeader
