import { Button, Modal } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import AddListing from "./AddListing";
import Listing from '../components/Listing';
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_MY_LISTINGS } from '../utils/queries';
import { useStoreContext  } from '../ctx/storeContext';

const MyListings = () => {
	const[state, dispath] = useStoreContext()


	const {
		data,
		loading,
		error
	} = useQuery(QUERY_MY_LISTINGS);
	const myListings = data?.myListings || [];
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	// if (loading) return <p>loading...</p>
	// if (error) return <p>error {error.message} </p>

	return (
		<>
			{ }
			{myListings.map(listing => {
				return (
					<Listing
					key={listing._id}
						listing={listing}>
					</Listing>
				)
			})}



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
