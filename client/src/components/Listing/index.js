import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap'
import { Link } from "react-router-dom"
import Auth from '../../utils/auth'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_TO_CART } from '../../utils/mutations'




const Listing = (props) => {
// currentUserId = Auth.getProfile().data?._id
// console.log(currentUserId)

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


    const [addToCart, { error }] = useMutation(ADD_TO_CART, {
        variables: {
            cartId: Auth.getProfile().data?._id,
            listingId: _id,
        }
    }
    );
 






    const saveItem = () => {
        console.log('item saved')

    }


    return (
        <>
            <Link
                to={`/listings/${_id}`}>
                <Card
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                >
                    {show ?
                        <Card.Body>
                            <Card.Img src={image}></Card.Img>
                            <Card.Header>{title}</Card.Header>
                            <Card.Text>seed userID  {description}</Card.Text>
                            <Card.Footer>{condition}${price}
                            </Card.Footer>
                        </Card.Body>
                        :
                        <Card.Body>
                            <Card.Img src={image}></Card.Img>
                        </Card.Body>
                    }
                </Card>
            </Link>
            {Auth.loggedIn() && Auth.getProfile().data?._id !== seller?._id ?
                <>
                    <Container>
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
                    <br />
                </>
                : <></>
            }

        </>
    )
}

export default Listing
