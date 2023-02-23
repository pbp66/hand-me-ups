
import { QUERY_LISTINGS } from "../utils/queries"
import { useQuery } from "@apollo/client"
import Grid from "../components/Grid"
import Listing from '../components/Listing'
import '../styles/discover.css'


const Discover = () => {


	const { data, loading, error } = useQuery(QUERY_LISTINGS);




	if (loading) return <p>loading</p>
	if (error) return <p>error {error.message} </p>
	const { allListings } = data || [];
	// const handleFormSubmit = async (event) => {
	// 	event.preventDefault();
	// }

	return (<>
		<h1>Discover</h1>
		<Grid colCount={4} md={3}>
			{allListings.map(listing => {
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

	);
};

export default Discover;
