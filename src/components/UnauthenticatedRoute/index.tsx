import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUser from '../../hooks/useUser'

interface Props {
  children: React.ReactNode
}

const UnauthenticatedRoute: React.FC<Props> = ({ children }) => {
  const { authenticating, user } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (authenticating) return
    if (user !== null) {
      router.push('/')
        .catch(err => { console.error(err) })
    }
  }, [authenticating, user])

  return (
    authenticating || user !== null
      ? <p>Loading...</p>
      : <>{children}</>
  )
}

export default UnauthenticatedRoute
