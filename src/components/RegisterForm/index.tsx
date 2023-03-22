import { REGISTER_ERRORS, REGISTER_FORM_FIELDS } from '../../constants/register'
import Button from '../Button'
import ErrorMessage from '../ErrorMessage'
import InputText from '../InputText'
import useRegisterForm from './useRegisterForm'

const RegisterForm: React.FC = () => {
  const { formState, error, loading, handleOnChange, handleConfirmPassword, handleSignin } = useRegisterForm()

  return (
    <form className='w-full flex flex-col gap-4' onSubmit={handleSignin}>
      <InputText
        label='Username'
        error={REGISTER_ERRORS.username}
        name={REGISTER_FORM_FIELDS.username}
        value={formState.username}
        onChange={handleOnChange}
        placeholder='Type'
        required
        type='text'
      />
      <InputText
        label='Password'
        error={REGISTER_ERRORS.password}
        name={REGISTER_FORM_FIELDS.password}
        onChange={handleOnChange}
        placeholder='At last 8 characters'
        required
        type='password'
        value={formState.password}
      />
      <InputText
        label='Confirm password'
        error={REGISTER_ERRORS.confirmPassword}
        name={REGISTER_FORM_FIELDS.confirmPassword}
        onChange={handleConfirmPassword}
        placeholder='At last 8 characters'
        required
        type='password'
        value={formState.confirmPassword}
      />
      {error !== '' && <ErrorMessage error={error}/>}
      <Button type='submit'>{loading ? 'loading...' : 'Register'}</Button>
    </form>
  )
}

export default RegisterForm
