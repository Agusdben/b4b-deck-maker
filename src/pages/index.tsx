import AppLayout from '@/components/AppLayout'
import AuthRoute from '@/components/AuthRoute'
import Button from '@/components/Button'
import Card from '@/components/Card'
import FilterCards from '@/components/FilterCards'
import { MAX_CARDS } from '@/constants/decks'
import useCards from '@/hooks/useCards'
import useDecks from '@/hooks/useDecks'
import { getCards } from '@/services/cards'
import { type Card as CardType } from '@/types/cards'
import { type GetStaticProps } from 'next'
import Link from 'next/link'

interface Props {
  cards: CardType[]
}

const Home: React.FC<Props> = ({ cards = [] }): JSX.Element => {
  const { filteredCards, handleQuery, handleAffinitySelected, handleCardTypeSelected } = useCards({ cards })
  const { decks, loading } = useDecks()

  return (
    <AuthRoute>
      <AppLayout>
        <section className='w-full h-full md:flex md:gap-4'>
          <article className='w-full h-full gap-4 hidden md:flex-1 md:flex md:flex-col'>
            <header>
              <FilterCards
                onQueryChange={handleQuery}
                onAffinityChange={handleAffinitySelected}
                onCardTypeChange={handleCardTypeSelected}
              />
            </header>
            <div className='overflow-auto grid grid-cols-auto-fill gap-x-4 gap-y-8'>
              {
                filteredCards.map(c => <Card key={c.id} card={c} />)
              }
            </div>
          </article>
          <aside className='w-full h-full flex flex-col gap-4 md:max-w-[200px]'>
            <h3 className='text-2xl text-center'>My decks</h3>
            <div className={`w-full flex-1 overflow-auto px-4 flex flex-col gap-4 bg-black-800 ${loading ? 'animate-pulse' : 'bg-transparent'}`}>
              {
                decks.length === 0 && !loading
                  ? (
                  <p className='m-auto text-center'>You don&apos;t have any deck</p>
                    )
                  : (
                  <>
                  {
                    decks.map(d => (
                      <Link href={`/deck/${d.id}`} key={d.id} className='w-full text-center border-1'>
                        <p>{d.title}</p>
                        <p>{d.total_cards}/{MAX_CARDS}</p>
                      </Link>
                    ))
                  }
                  </>
                    )
              }

            </div>
            <footer className='w-full'>
              <Button>New deck</Button>
            </footer>
          </aside>
        </section>
      </AppLayout>
    </AuthRoute>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const cards: CardType[] = await getCards()

  return {
    props: {
      cards
    }
  }
}

export default Home
