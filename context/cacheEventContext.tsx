import { ReactNode, useContext } from 'react'
import { createContext } from 'react'

interface Props {
  children?: ReactNode
}

interface EventsInterface {
  setCacheEventsData: ({
    cacheName,
    fetchedEventsData,
    url
  }: {
    cacheName: string
    fetchedEventsData: any
    url: string
  }) => void
}

const EventsContext = createContext<EventsInterface>({
  setCacheEventsData: () => undefined
})

const EventsProvider = ({ children }: Props): JSX.Element => {
  const setCacheEventsData = ({
    cacheName,
    fetchedEventsData,
    url
  }: {
    cacheName: string
    fetchedEventsData: any
    url: string
  }) => {

    const cachedData = new Response(JSON.stringify(fetchedEventsData))
    console.log('====cacheEventContext:setCacheEventsData===')
    console.log(cachedData)
    console.log('===========================================')
    
    if('caches' in window){

      caches.open(cacheName).then((cache)=>{
        cache.put(url, cachedData)
        console.log('data cached in the webbrowser!!!')
      })
    }
  
  }

  return (
    <EventsContext.Provider
      value={{
        setCacheEventsData: setCacheEventsData
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

const useEventsCache = () => useContext(EventsContext)

export { useEventsCache, EventsProvider }
