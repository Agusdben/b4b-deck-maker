import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import LoginForm from '../../components/LoginForm'
import SectionTitle from '../../components/SectionTitle'

const Login: React.FC = () => {
  return (
    <AppLayout>
      <section className='flex gap-4 flex-col items-center justify-center w-full max-w-xs p-4 rounded-md bg-black-800'>
        <SectionTitle>Login</SectionTitle>
        <LoginForm />
      </section>
      <section>
        <Link href={'/register'} className='hover:text-primary'>Create an account</Link>
      </section>
    </AppLayout>
  )
}

export default Login
