import { Button, Modal, Container, Row, Col } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import AddListing from "./AddListing";
import Listing from "../components/Listing";
import Grid from "../components/Grid";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_MY_LISTINGS, QUERY_LISTINGS } from "../utils/queries";
import { REMOVE_LISTING } from "../utils/mutations";

const MyListings = (props) => {
	const { data, loading, error } = useQuery(QUERY_MY_LISTINGS);
	const myListings = data?.myListings || [];
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	// move this to my Listings since we wont show the users listings on discover page

	const [removeListing] = useMutation(REMOVE_LISTING, {
		refetchQueries: [
			{ query: QUERY_MY_LISTINGS },
			"QUERY_MY_LISTINGS",
			{ query: QUERY_LISTINGS },
			"QUERY_LISTINGS"
		],
	});

	const handleRemoveListing = async (id) => {
		await removeListing({
			variables: {listingId: id}
		})
	}

	return (
		<>
			<Grid colCount={4} md={3}>
				{myListings.map(listing => {
					return (
						<>
							<Listing
								key={listing._id}
								listing={listing}
							>
							</Listing>

							<Container>
								<Row>
									<Col>
										<Button onClick={() => { handleRemoveListing(listing._id) }}>
											Remove Listing
										</Button>
									</Col>
								</Row>
							</Container>
						</>
					)
				})}
			</Grid>



			<center>
				<Button onClick={handleShow}>Add New Listing</Button>
				<Modal
					animation={false}
					show={show}
					onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add Listing</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<AddListing />
					</Modal.Body>
				</Modal>
			</center>

		</>
	);
};

export default MyListings;
