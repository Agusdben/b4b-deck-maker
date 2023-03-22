import Link from 'next/link'

const AppFooter: React.FC = () => {
  return (
    <footer className="mt-10 border-t-1 border-primary py-4 flex items-center justify-center text-gray">
      <section className='w-full max-w-7xl m-auto flex flex-col items-center gap-4 md:flex-row md:justify-between'>
        <small className='max-w-sm block'>This website is not affiliated with or endorsed by Back 4 Blood. It is designed for educational purposes and not for profit.</small>
        <div className='flex gap-2 hover:[&_a]:text-primary [&_a]:transition-colors'>
          <Link href='https://www.linkedin.com/in/agusdben/' rel='noopener noreferrer' target='_blank' >LinkedIn</Link>
          <Link href='https://github.com/Agusdben' rel='noopener noreferrer' target='_blank' >GitHub</Link>
        </div>
      </section>
    </footer>
  )
}

export default AppFooter
