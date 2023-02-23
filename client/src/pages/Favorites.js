import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client';
import { Button, Container, Row, Col } from "react-bootstrap";
import Grid from "../components/Grid"
import Listing from "../components/Listing"
import { UNFAVORITE_LISTING } from '../utils/mutations';
import { QUERY_FAVORITE_LISTINGS } from '../utils/queries';






const Favorites = (props) => {
	const { data, loading, error } = useQuery(QUERY_FAVORITE_LISTINGS);
	console.log(data)
	const myFavorites = data?.favoriteListings || [];

	const [unFavoriteListing] = useMutation(UNFAVORITE_LISTING, {
		refetchQueries: [
			{
				query:
					QUERY_FAVORITE_LISTINGS
			},
			"FAVORITE_LISTINGS",
		]
	})

	const handleFavorite = async (id) => {
		console.log(id)
		await unFavoriteListing({
			variables: { listingId: id },
		})
	};



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

						<Container>
							<Row>
								<Col>
									<Button
										onClick={() => {
											handleFavorite(listing._id);
										}}
									>
										UnFavorite
									</Button>
								</Col>
							</Row>
						</Container>
					</>)
				})}
			</Grid>

		</>
	)
}

export default Favorites