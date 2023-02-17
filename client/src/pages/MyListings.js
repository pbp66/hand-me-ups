import { Button, Modal } from 'react-bootstrap'
import AddListing from "./AddListing";
import { useState } from 'react'

const MyListings = () => {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	return (


		<>
			<h1>MyListings populate here</h1>
			{/* <Listing
				listing={listing}>
			</Listing> */}


			<center>
				<Button onClick={handleShow}>Add New Listing</Button>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Shopping Cart</Modal.Title>
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
