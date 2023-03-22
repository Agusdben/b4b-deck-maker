
const AppFooter: React.FC = () => {
  return (
    <footer className="mt-10 border-t-1 border-primary py-4 flex items-center justify-center text-gray">
      <section className='w-full max-w-7xl m-auto flex flex-col items-center gap-4 md:flex-row md:justify-between'>
        <small className='max-w-sm block'>This website is not affiliated with or endorsed by Back 4 Blood. It is designed for educational purposes and not for profit.</small>
        <div className="flex flex-col">
          <small>® Created by Agustin Di Benedetto</small>
          <small>Feel free in use code</small>
        </div>
      </section>
    </footer>
  )
}

export default AppFooter
