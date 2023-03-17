import useUser from '@/hooks/useUser'
import { colors } from '@/styles/theme'
import { useState } from 'react'
import AppMenu from '../AppMenu'
import BarsIcon from '../Icons/BarsIcon'

const AppHeader: React.FC = () => {
  const { user } = useUser()
  const [toggle, setToggle] = useState(false)

  const handleToggle = (): void => {
    setToggle(!toggle)
  }

  return (
    <header className='flex justify-between py-2 relative'>
      <h1 className='p-2'>B4B</h1>
      {
        user !== null && (
          <>
            <button onClick={handleToggle} className='flex p-2 gap-1 items-center hover:brightness-50 text-2xl'>
              <BarsIcon fill={colors.primary}/>
            </button>
            <nav className={`absolute z-10 top-0 overflow-auto bg-black-800 w-full h-screen transition-right max-w-xs ${toggle ? 'right-0' : '-right-full'}`}>
              <AppMenu onClose={handleToggle}/>
            </nav>
          </>
        )
      }
    </header>
  )
}

export default AppHeader
