import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap'
import auth from '../../utils/auth'
import { useState } from 'react'




const Listing = (props) => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)




    const {
        title,
        image,
        description,
        price,
        size,
        color,
        condition,
        tags,
        listing_date,
        category,
        seller
    } = props.listing

    // const currentUser = auth.getProfile()


    // const showModal = (e) => {
    //     return (<>
    //         <Button onClick={handleShow}>Add New Listing</Button>
    //         <Modal show={show} onHide={handleClose}>
    //             <Modal.Header closeButton>
    //                 <Modal.Title>Add Listing</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>

    //             </Modal.Body>
    //         </Modal>
    //     </>
    //     )
    // }


    return (
        <>
            <a className="card-block stretched-link text-decoration-none" href>
                <Card>
                    <Card.Body>
                        <Card.Header>{title}</Card.Header>
                        <Card.Img src={image}></Card.Img>
                        <Card.Text>seed userID  {description}</Card.Text>
                        <Card.Footer>{condition}${price}
                        {/* <Button
							onClick={() => { }}>
							Add to Cart 
						</Button> */}
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </a>
        </>
    )
}

export default Listing
