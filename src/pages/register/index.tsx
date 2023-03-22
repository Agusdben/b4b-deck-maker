import AppLayout from '@/components/AppLayout'
import RegisterForm from '@/components/RegisterForm'
import SectionTitle from '@/components/SectionTitle'
import UnauthenticatedRoute from '@/components/UnauthenticatedRoute'
import Link from 'next/link'

const RegisterPage: React.FC = () => {
  return (
    <UnauthenticatedRoute>
      <AppLayout>
        <section className='flex gap-4 flex-col items-center justify-center w-full max-w-xs p-4 rounded-md bg-black-800'>
          <SectionTitle>Register</SectionTitle>
          <RegisterForm />
        </section>
        <section>
          <Link href={'/login'}>Already have an account?</Link>
        </section>
      </AppLayout>
    </UnauthenticatedRoute>
  )
}

export default RegisterPage
