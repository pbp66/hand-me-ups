import { useState, useEffect } from "react"
import { Container, Card, CardColumns, Row, Col } from "react-bootstrap"
import { QUERY_LISTINGS } from "../utils/queries"
import { useQuery } from "@apollo/client"
import Grid from "../components/Grid"
import Listing from '../components/Listing'
import '../styles/discover.css'

const Discover = () => {
	// const { loading, data } = useQuery(QUERY_LISTINGS);
	let listings = Array(16).fill({
		title: "Listing Title",
		description: "Listing Description",
		price: 250,
		category: "Listing Category",
		tags: ["90s", "other"],
		size: "XXL",
		color: ["red", "blue", "green"],
		condition: "NEW",
		image: "https://via.placeholder.com/1000 ",
	})
	// const [searchedItems, setSearchedItems] = useState([]);
	// const [searchInput, setSearchInput] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// if (!searchInput) {
		// 	return false;
		// }


	}
	return (<>
		<Grid colCount={2} md={6}>	
		{listings.map(listing => {
			return (<>

				<Listing
					listing={listing}>
				</Listing>

			</>)
		})}
		
		</Grid>	
		
		
		<h1>Discover</h1>


	</>

	);
};

export default Discover;
