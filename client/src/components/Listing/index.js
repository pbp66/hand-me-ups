import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap'
import { Link } from "react-router-dom"
import Auth from '../../utils/auth'
import { useState } from 'react'




const Listing = (props) => {


    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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
                : <></>
            }

        </>
    )
}

export default Listing
