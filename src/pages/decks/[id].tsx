import AppLayout from '@/components/AppLayout'
import AuthRoute from '@/components/AuthRoute'
import Card from '@/components/Card'
import DeckCards from '@/components/DeckCards'
import FilterCards from '@/components/FilterCards'
import useCards from '@/hooks/useCards'
import useDeck from '@/hooks/useDeck'
import { getCards } from '@/services/cards'
import { getOneDeck } from '@/services/decks'
import { getCardsByDeckId } from '@/services/decksCard'
import { type Card as CardType } from '@/types/cards'
import { type CookiesObj, type Cookies } from '@/types/cookies'
import { type Deck } from '@/types/decks'
import { type GetServerSideProps } from 'next'

interface Props {
  cards: CardType[]
  deck: Deck
  propDeckCards: CardType[]
}

const DeckPage: React.FC<Props> = ({ cards, deck, propDeckCards }) => {
  const { filteredCards, handleQuery, handleAffinitySelected, handleCardTypeSelected } = useCards({ cards })
  const { deckCards, handleAddCardToDeck, handleRemoveCardFromDeck, cardsInQueue } = useDeck({ deck, initialDeckCards: propDeckCards })

  return (
    <AuthRoute>
      <AppLayout>
        <section className='w-full h-full flex flex-col md:flex-row md:gap-4'>
          <article className='flex flex-col overflow-hidden gap-4 md:flex-1'>
            <header>
              <FilterCards
                onQueryChange={handleQuery}
                onAffinityChange={handleAffinitySelected}
                onCardTypeChange={handleCardTypeSelected}
              />
            </header>
            <div className='overflow-auto flex-1 grid grid-cols-auto-fill gap-x-4 gap-y-8'>
              {
                filteredCards.map(c => {
                  const isAdded = deckCards.some(dc => dc.id === c.id)
                  const isInQueue = cardsInQueue.some(cardQueue => cardQueue.id === c.id)
                  return (
                    <button
                      disabled={isInQueue}
                      onClick={() => { isAdded ? handleRemoveCardFromDeck(c) : handleAddCardToDeck(c) }}
                      key={c.id} className={`border-2 max-w-[210px] m-auto text-left px-2 hover:border-gray rounded-md ${isAdded ? 'border-primary' : 'border-transparent'} `}>
                      <Card card={c} />
                    </button>
                  )
                })
              }
            </div>
          </article>
          <aside className='h-full flex flex-col'>
            <h3>{deck.title}</h3>
            <DeckCards cards={deckCards} onRemoveCard={handleRemoveCardFromDeck}/>
          </aside>
        </section>
      </AppLayout>
    </AuthRoute>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const deckId = context.params?.id as string
  const cards: CardType[] = await getCards()
  const cookieString = context.req.headers.cookie

  if (cookieString === undefined || deckId === undefined) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const cookies = cookieString.split(';').reduce<CookiesObj>((acc, cookie) => {
    const [name, value] = cookie.split('=').map(c => c.trim())
    acc[name as Cookies] = value
    return acc
  }, {})

  if (cookies.TOKEN === undefined) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const deckCards = await getCardsByDeckId({ id: deckId, token: cookies.TOKEN })

  const deck = await getOneDeck({ id: deckId, token: cookies.TOKEN })

  return {
    props: {
      cards,
      deck,
      propDeckCards: deckCards
    }
  }
}

export default DeckPage
