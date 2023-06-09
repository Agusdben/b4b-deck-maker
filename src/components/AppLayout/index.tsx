import Head from 'next/head'
import React from 'react'
import { Monda } from 'next/font/google'
import { colors } from '@/styles/theme'
import AppHeader from '../AppHeader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppFooter from '../AppFooter'

const monda = Monda({ weight: '400', subsets: ['latin'] })

interface Props {
  children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
    <Head>
      <title>B4B DM</title>
      <meta name="description" content="Back 4 Blood deck maker" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={`${monda.className} h-screen w-screen px-4 overflow-y-auto overflow-x-hidden grid gap-4 grid-rows-layout grid-cols-1 text-white bg-black`}>
      <AppHeader />
      <main className='bg-black overflow-hidden flex flex-col items-center justify-center gap-4'>{children}</main>
      <AppFooter />
    </div>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      limit={3}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="dark"
    />
    <style global jsx>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 4px;
        }

        ::-webkit-scrollbar-track {
          background: ${colors['black-800']};
        }

        ::-webkit-scrollbar-thumb {
          background: ${colors.primary};
        }

        ::-webkit-scrollbar-thumb:hover {
          filter: brightness(75%);
        }
      `}</style>
  </>
  )
}

export default AppLayout
