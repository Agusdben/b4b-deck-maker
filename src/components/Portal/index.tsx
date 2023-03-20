import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: React.ReactNode
  elementID: 'modal'
}

const Portal: React.FC<Props> = ({ children, elementID }) => {
  const [mounted, setMounted] = useState(false)

  const portalRoot = document.querySelector(`#${elementID}`)

  if (portalRoot === null) {
    console.error(`Portal to ID: "${elementID}" not found`)
    return null
  }

  useEffect(() => {
    setMounted(true)

    return () => { setMounted(false) }
  }, [])

  return mounted
    ? createPortal(children, portalRoot)
    : null
}

export default Portal
