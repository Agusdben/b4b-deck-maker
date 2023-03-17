import { createContext, useEffect, useState } from 'react'
import { LOCAL_STORAGE_KEYS } from '../constants/localStorage'
import { loginWithToken } from '../services/user'
import { type User } from '../types/user'

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
    const token = window.localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
    if (token === null) {
      setUser(null)
      setAuthenticating(false)
      return
    }
    loginWithToken({ token }).then(user => {
      setUser(user)
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, user.token)
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
