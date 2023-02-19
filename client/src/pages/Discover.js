import { useState, useEffect } from "react"
import { Container, Card, CardColumns, Row, Col, Button } from "react-bootstrap"
import { QUERY_LISTINGS } from "../utils/queries"
import { useQuery } from "@apollo/client"
import { useStoreContext } from "../ctx/storeContext"
import Grid from "../components/Grid"
import Listing from '../components/Listing'
import '../styles/discover.css'
import { UPDATE_LISTINGS } from "../ctx/actions"

const Discover = () => {
	const [state, dispatch] = useStoreContext()

	const { data, loading, error } = useQuery(QUERY_LISTINGS);
	console.log(data?.allListings)

	useEffect(() => {
		if (data) {
			dispatch({
				type: UPDATE_LISTINGS,
				payload: data.allListings
			})
		}
	}, [data, loading, dispatch])

	if (loading) return <p>loading</p>
	if (error) return <p>error {error.message} </p>
	const { allListings } = data || [];
	// const handleFormSubmit = async (event) => {
	// 	event.preventDefault();
	// }
	console.log(state)
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
