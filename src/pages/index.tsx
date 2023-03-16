import AppLayout from '@/components/AppLayout'
import AuthRoute from '@/components/AuthRoute'
import Card from '@/components/Card'
import FilterCards from '@/components/FilterCards'
import useCards from '@/hooks/useCards'
import { getCards } from '@/services/cards'
import { type Card as CardType } from '@/types/cards'
import { type GetStaticProps } from 'next'

interface Props {
  initialCards: CardType[]
}

const Home: React.FC<Props> = ({ initialCards }): JSX.Element => {
  const { cards, handleQuery, handleAffinitySelected, handleCardTypeSelected } = useCards({ cards: initialCards })

  return (
    <AuthRoute>
      <AppLayout>
        <section className='w-full h-full flex flex-col gap-4'>
          <header>
            <FilterCards
              onQueryChange={handleQuery}
              onAffinityChange={handleAffinitySelected}
              onCardTypeChange={handleCardTypeSelected}
            />
          </header>
          <article className='overflow-auto grid grid-cols-auto-fill gap-x-4 gap-y-8'>
            {
              cards.map(c => <Card key={c.id} card={c} />)
            }
          </article>
        </section>
      </AppLayout>
    </AuthRoute>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const cards: CardType[] = await getCards()
  return {
    props: {
      initialCards: cards
    }
  }
}

export default Home
