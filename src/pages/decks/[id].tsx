import AppLayout from '@/components/AppLayout'
import AuthRoute from '@/components/AuthRoute'
import Card from '@/components/Card'
import DeckCards from '@/components/DeckCards'
import DeckTitle from '@/components/DeckTitle'
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
  propDeck: Deck
  propDeckCards: CardType[]
}

const DeckPage: React.FC<Props> = ({ cards, propDeck, propDeckCards }) => {
  const { filteredCards, handleQuery, handleAffinitySelected, handleCardTypeSelected } = useCards({ cards })
  const { deck, deckCards, cardsInQueue, handleAddCardToDeck, handleRemoveCardFromDeck, handleUpdateTitle } = useDeck({ initialDeck: propDeck, initialDeckCards: propDeckCards })
  const getIfCardIsInQueue = (c: CardType): boolean => {
    return cardsInQueue.some(cardQueue => cardQueue.id === c.id)
  }
  return (
    <AuthRoute>
      <AppLayout>
        <section className='w-full h-full flex flex-col md:flex-row md:gap-2'>
          <article className='flex flex-col overflow-hidden gap-4 md:flex-1'>
            <header>
              <FilterCards
                onQueryChange={handleQuery}
                onAffinityChange={handleAffinitySelected}
                onCardTypeChange={handleCardTypeSelected}
              />
            </header>
            <div className='overflow-auto flex-1 grid grid-cols-auto-fill gap-x-4 gap-y-8 bg-black-800 p-2'>
              {filteredCards.length === 0 && <p className=''>No cards found</p>}
              {
                filteredCards.map(c => {
                  const isAdded = deckCards.some(dc => dc.id === c.id)
                  const isInQueue = getIfCardIsInQueue(c)
                  return (
                    <button
                      disabled={isInQueue}
                      onClick={() => { isAdded ? handleRemoveCardFromDeck(c) : handleAddCardToDeck(c) }}
                      key={c.id} className={`border-2 h-fit max-w-[200px] bg-black md:max-w-full mx-auto text-left hover:border-gray rounded-md 
                      ${isAdded ? 'border-primary' : 'border-transparent'} 
                      disabled:opacity-50
                      `}
                    >
                      <Card card={c} />
                    </button>
                  )
                })
              }
            </div>
          </article>
          <aside className='flex md:h-full flex-col mt-auto bg-black-800'>
            <DeckTitle onUpdateTitle={handleUpdateTitle} title={deck.title}/>
            <DeckCards cards={deckCards} onRemoveCard={handleRemoveCardFromDeck} queue={cardsInQueue}/>
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
      propDeck: deck,
      propDeckCards: deckCards
    }
  }
}

export default DeckPage
