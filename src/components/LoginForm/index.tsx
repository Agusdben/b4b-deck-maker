import { LOGIN_FORM_FIELDS } from '../../constants/login'
import Button from '../Button'
import ErrorMessage from '../ErrorMessage'
import InputText from '../InputText'
import useLoginForm from './useLoginForm'

const LoginForm: React.FC = () => {
  const { formState, loading, error, handleOnChange, handleLogin } = useLoginForm()

  return (
    <form onSubmit={handleLogin} className='flex gap-4 flex-col w-full'>
      <InputText
        name={LOGIN_FORM_FIELDS.username}
        label={LOGIN_FORM_FIELDS.username}
        onChange={handleOnChange}
        placeholder='Type here'
        required
        type='text'
        value={formState.username}
      />
      <InputText
        name={LOGIN_FORM_FIELDS.password}
        label={LOGIN_FORM_FIELDS.password}
        onChange={handleOnChange}
        placeholder='8 characters or more'
        required
        type='password'
        value={formState.password}
      />
      {error !== '' && <ErrorMessage error={error}/>}
      <Button solid type='submit'>{loading ? 'loading...' : 'Login'}</Button>
    </form>
  )
}

export default LoginForm
