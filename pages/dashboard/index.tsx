import Link from 'next/link'
import Image from 'next/image'
import { db } from '../../services/firebase_config'
import { useEffect, useState } from 'react'
import { collection, getDocs } from '@firebase/firestore'

interface EventInterface {}
export default function Dashboard() {
  const [fetched, setFetched] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<EventInterface[]>([])
  const [pastEvents, setPastEvents] = useState<EventInterface[]>([])

  useEffect(() => {
    const fetchData = async () => {
		console.log('fetching')
		const query = await getDocs(collection(db, 'user'))
		// console.log('fetched :)')
		// setFetched(true)
	}
    if (!fetched) {
      fetchData()
    }
  }, [])
  return <div>TODO dashboard </div>
}
