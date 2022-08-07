import { useRouter } from "next/router"
import { useEffect } from "react"

/*
**plan for the see all.
**from the dashboard page, pass the 'pastEvents'/'upcomingEvents' value to this page, from the urlQuery.
** here, retrieve  
*/

export default function SeeAll(){
	const router = useRouter()
	useEffect(()=>{
		console.log(router.query)
	},[])
	return <div className="bg-sky-500 pt-[40px]">
		Showing All the events tiles available
	</div>
}