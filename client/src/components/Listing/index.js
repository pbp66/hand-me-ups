import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useStoreContext } from '../../ctx/storeContext'
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../ctx/actions'
import { idbPromise } from "../../utils/helpers"
import Auth from '../../utils/auth'
import { useState } from 'react'




const Listing = (props) => {
    // const [state, dispatch]= useStoreContext()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    if (Auth.loggedIn()) {
        console.log(Auth.getProfile())
    }


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
        console.log('added to cart')
    }

    const saveItem = () => {
        console.log('item saved')

    }


console.log(seller._id)
const sellerId = seller._id
console.log(Auth.getProfile().data._id)

    return (
        <>
            <Link to={`/listings/${_id}`}>
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
            {Auth.loggedIn() && Auth.getProfile().data._id !== sellerId ?
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
