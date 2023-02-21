import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap'
import { useMutation } from "@apollo/client"
import { Link } from "react-router-dom"
import Auth from '../../utils/auth'
import { useState } from 'react'
import { REMOVE_LISTING } from '../../utils/mutations'




const Listing = (props) => {


    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    // Finish this
    const [removeListing, { data, loading, error }] = useMutation(REMOVE_LISTING)

    const {
        _id,
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

    // const { cart } = state

    const addToCart = () => {
        //use add to cart
        //refresh getcart query
        console.log('added to cart')
    }

    const saveItem = () => {
        console.log('item saved')

    }

    const removeItem = () => {
        
        console.log("Deleted")
    }


    return (
        <>
            <Link
                to={`/listings/${_id}`}>
                <Card>
                    <Card.Body>
                        <Card.Header>{title}</Card.Header>
                        <Card.Img src={image}></Card.Img>
                        <Card.Text>seed userID  {description}</Card.Text>
                        <Card.Footer>{condition}${price}
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </Link>
            {Auth.loggedIn() && Auth.getProfile().data._id !== seller._id ?
                <><Container>
                    <Row>
                        <Col>
                            <Button
                                onClick={addToCart}>
                                Add to Cart
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={saveItem}>
                                Save to favorites
                            </Button>
                        </Col>
                    </Row>
                </Container>
                </>
                : 
                <>
                    <Container>
                        <Row>
                            <Col>
                                <Button onClick={removeListing}>
                                    Remove Listing
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </>
            }

        </>
    )
}

export default Listing
