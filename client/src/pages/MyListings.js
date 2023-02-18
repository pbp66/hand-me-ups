import { Button, Modal } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import AddListing from "./AddListing";
import Listing from '../components/Listing';
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_USER_LISTINGS } from '../utils/queries';

const MyListings = () => {
const {id} = useParams()
console.log(id)
	const {
		data,
		loading,
		error
	} = useQuery(QUERY_USER_LISTINGS,{
		variables: {
		  _id: id
		}
	  });
	const myListings = data || [];
	console.log(myListings)
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	if (loading) return <p>loading...</p>
	if (error) return <p>error {error.message} </p>
	return (
		<>
			{ }
			{myListings.map(listing => {
				return (
					<Listing
						listing={listing}>
					</Listing>
				)
			})}



			<center>
				<Button onClick={handleShow}>Add New Listing</Button>
				<Modal show={show} onHide={handleClose}>
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
