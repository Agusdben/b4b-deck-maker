import AppLayout from '@/components/AppLayout'
import AuthRoute from '@/components/AuthRoute'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Deck from '@/components/Deck'
import FilterCards from '@/components/FilterCards'
import { MAX_DECKS } from '@/constants/decks'
import useCards from '@/hooks/useCards'
import useDecks from '@/hooks/useDecks'
import { getCards } from '@/services/cards'
import { type Card as CardType } from '@/types/cards'
import { type GetStaticProps } from 'next'

interface Props {
  cards: CardType[]
}

const Home: React.FC<Props> = ({ cards = [] }): JSX.Element => {
  const { filteredCards, handleQuery, handleAffinitySelected, handleCardTypeSelected } = useCards({ cards })
  const { decks, loading, creatingDeck, handleCreateNewDeck, handleDeleteDeck } = useDecks()

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
            <div className='overflow-auto grid grid-cols-auto-fill gap-x-4 gap-y-8 p-2 bg-black-800'>
              {filteredCards.length === 0 && <p className=''>No cards found</p>}
              {
                filteredCards.map(c => <Card key={c.id} card={c} />)
              }
            </div>
          </article>
          <aside className='w-full h-full flex flex-col gap-4 md:max-w-[250px] bg-black-800'>
            <h3 className='text-xl text-center bg-primary text-black px-4 py-2 font-bold'>My decks</h3>
            <div className={`w-full flex-1 overflow-auto flex flex-col gap-4 p-2 ${loading ? 'animate-pulse' : 'bg-transparent'}`}>
              {
                decks.length === 0 && !loading
                  ? <p className='m-auto text-center'>You don&apos;t have any deck</p>
                  : (
                  <>
                  {
                    decks.map(d => <Deck key={d.id} deck={d} onDelete={handleDeleteDeck}/>)
                  }
                  </>
                    )
              }
            </div>
            <footer className='w-full flex items-stretch gap-2 bg-black'>
              <div className='flex items-center flex-col p-2 font-bold ml-auto'>
                <p className='text-xl'>{decks.length}/{MAX_DECKS}</p>
                <small>Decks</small>
              </div>
              <Button solid type='button' onClick={handleCreateNewDeck}>{creatingDeck ? 'Creating...' : 'New deck'}</Button>
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
