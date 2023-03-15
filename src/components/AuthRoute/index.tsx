import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useUser from '../../hooks/useUser'

interface Props {
  children: React.ReactNode
}

const AuthRoute: React.FC<Props> = ({ children }) => {
  const { user, authenticating } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (authenticating) return
    if (user == null) {
      router.push('/login')
        .catch((err) => { console.error(err) })
    }
  }, [user, authenticating])

  return (authenticating || user === null
    ? <p>Loading...</p>
    : <>{children}</>
  )
}

export default AuthRoute
