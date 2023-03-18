import { createContext, useEffect, useState } from 'react'
import { COOKIES_KEYS } from '../constants/cookiesKeys'
import { loginWithToken } from '../services/user'
import { type User } from '../types/user'
import Cookies from 'js-cookie'

interface Context {
  user: User | null
  authenticating: boolean
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<Context>({
  user: null,
  authenticating: true,
  setUser: () => {}
})

interface Props {
  children: React.ReactNode
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<Context['user']>(null)
  const [authenticating, setAuthenticating] = useState(true)

  useEffect(() => {
    const token = Cookies.get(COOKIES_KEYS.TOKEN)
    if (token === undefined) {
      setUser(null)
      setAuthenticating(false)
      return
    }
    loginWithToken({ token }).then(user => {
      setUser(user)
      Cookies.set(COOKIES_KEYS.TOKEN, user.token, { expires: 30 })
    }).catch(error => {
      console.error(error)
      setUser(null)
    }).finally(() => {
      setAuthenticating(false)
    })
  }, [])

  return (
    <UserContext.Provider value={{ user, authenticating, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
