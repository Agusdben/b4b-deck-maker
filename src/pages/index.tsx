import AppLayout from '@/components/AppLayout'
import AuthRoute from '@/components/AuthRoute'

export default function Home (): JSX.Element {
  return (
    <AuthRoute>
      <AppLayout>
        AUTH
      </AppLayout>
    </AuthRoute>
  )
}
