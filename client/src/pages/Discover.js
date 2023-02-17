import { useState, useEffect } from "react"
import { Container, Card, CardColumns } from "react-bootstrap"
import { QUERY_LISTINGS } from "../utils/queries"
import { useQuery } from "@apollo/client"

const Discover = () => {
	const { loading, data } = useQuery(QUERY_LISTINGS);
	console.log(data)

	const [searchedItems, setSearchedItems] = useState([]);
	const [searchInput, setSearchInput] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (!searchInput) {
			return false;
		}


	}
	return (
		<Container>
			<h1>Discover</h1>
			<CardColumns>
				{/* map listings here */}
				<Card>
					<Card.Body>
						<Card.Title></Card.Title>
						<p>Price: </p>
						<p>Size: </p>
					</Card.Body>
				</Card>
			</CardColumns>

		</Container>
	);
};

export default Discover;
