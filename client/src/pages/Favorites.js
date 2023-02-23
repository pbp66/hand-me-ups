import { useQuery } from '@apollo/client'
import Grid from "../components/Grid"
import Listing from "../components/Listing"
import { QUERY_FAVORITE_LISTINGS } from '../utils/queries';





const Favorites = () => {
	const { data, loading, error } = useQuery(QUERY_FAVORITE_LISTINGS);
	
	const myFavorites = data?.favoriteListings || [];


	console.log(myFavorites)
	return (
		<>
			<Grid colCount={4} md={3}>
			{myFavorites.map(listing => {
				return (<>
					<Listing
						key={listing._id}
						listing={listing}
					>
					</Listing>
				</>)
			})}
		</Grid>
		</>
	)
}

export default Favorites