import { useContext } from 'react'
import { LOCAL_STORAGE_KEYS } from '../constants/localStorage'
import { UserContext } from '../contexts/UserContext'
import { loginWithUsernameAndPassword } from '../services/user'
import { type LoginFormFields } from '../types/login'
import { type User } from '../types/user'

interface ReturnType {
  user: User | null
  authenticating: boolean
  login: ({ password, username }: LoginFormFields) => Promise<void>
  logout: () => void
}

const useUser = (): ReturnType => {
  const { user, setUser, authenticating } = useContext(UserContext)

  const login = async ({ password, username }: LoginFormFields): Promise<void> => {
    await loginWithUsernameAndPassword({ password, username })
      .then(user => {
        setUser(user)
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, user.token)
      })
  }

  const logout = (): void => {
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
    setUser(null)
  }

  return {
    user,
    authenticating,
    login,
    logout
  }
}

export default useUser
