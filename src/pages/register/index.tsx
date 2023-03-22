import AppLayout from '@/components/AppLayout'
import RegisterForm from '@/components/RegisterForm'
import SectionTitle from '@/components/SectionTitle'
import UnauthenticatedRoute from '@/components/UnauthenticatedRoute'
import Link from 'next/link'

const RegisterPage: React.FC = () => {
  return (
    <UnauthenticatedRoute>
      <AppLayout>
        <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
          <section className='max-w-xs w-full p-4 flex flex-col items-center justify-center bg-black-700 rounded-md'>
            <SectionTitle>Register</SectionTitle>
            <RegisterForm />
          </section>
          <section>
            <Link href={'/login'}>Already have an account?</Link>
          </section>
        </div>
      </AppLayout>
    </UnauthenticatedRoute>
  )
}

export default RegisterPage
