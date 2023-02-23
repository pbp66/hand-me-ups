import { useQuery } from '@apollo/client'
import Grid from "../components/Grid"
import Listing from "../components/Listing"
import { QUERY_FAVORITE_LISTINGS } from '../utils/queries';





const Favorites = () => {
	const { data, loading, error } = useQuery(QUERY_FAVORITE_LISTINGS);
	console.log(data)
	const myFavorites = data?.favoriteListings || [];



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