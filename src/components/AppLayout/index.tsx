import Head from 'next/head'
import React from 'react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: '400', subsets: ['latin'] })

interface Props {
  children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={`${roboto.className} h-screen w-screen overflow-hidden grid grid-rows-layout grid-cols-1 text-white bg-black`}>
      <header>header</header>
      <main className='bg-black overflow-hidden flex flex-col items-center justify-center gap-4'>{children}</main>
      <footer>footer</footer>
    </div>
  </>
  )
}

export default AppLayout
