import { useRouter } from 'next/router'
import type React from 'react'
import { useState } from 'react'
import { REGISTER_ERRORS, REGISTER_REGEX } from '../../constants/register'
import useUser from '../../hooks/useUser'
import { registerNewUser } from '../../services/user'
import { type RegisterFormValues, type KeyInRegisterFormFields, type RegisterFormFields } from '../../types/register'

interface ReturnType {
  formState: RegisterFormFields
  error: string
  loading: boolean
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleConfirmPassword: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSignin: (e: React.FormEvent<HTMLFormElement>) => void
}

const useRegisterForm = (): ReturnType => {
  const { login } = useUser()
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] =
  useState<RegisterFormFields>({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    const regex = REGISTER_REGEX[name as KeyInRegisterFormFields]

    if (!regex.test(value)) {
      const errorMessage = REGISTER_ERRORS[name as KeyInRegisterFormFields]
      e.target.setCustomValidity(errorMessage)
    } else {
      e.target.setCustomValidity('')
    }

    setFormState((formState) => {
      return {
        ...formState,
        [name]: value
      }
    })
  }

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    if (value !== formState.password) {
      const errorMessage = REGISTER_ERRORS[name as KeyInRegisterFormFields]
      e.target.setCustomValidity(errorMessage)
    } else {
      e.target.setCustomValidity('')
    }

    setFormState((formState) => {
      return {
        ...formState,
        [name]: value
      }
    })
  }

  const handleSignin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const body: RegisterFormValues = {
      username: formState.username,
      password: formState.password,
      confirmPassword: formState.confirmPassword
    }
    registerNewUser(body)
      .then(() => {
        login({ password: body.password, username: body.username })
          .catch(error => { console.error(error) })

        router.push('/')
          .catch(error => { console.error(error) })
      })
      .catch(error => { setError(error.message) })
      .finally(() => { setLoading(false) })
  }

  return {
    formState,
    error,
    loading,
    handleOnChange,
    handleConfirmPassword,
    handleSignin
  }
}

export default useRegisterForm
