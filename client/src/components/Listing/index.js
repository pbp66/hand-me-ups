import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { useMutation } from "@apollo/client"
import { Link } from "react-router-dom"
import Auth from '../../utils/auth'
import { useState } from 'react'

import { REMOVE_LISTING, ADD_TO_CART, FAVORITE_LISTING } from '../../utils/mutations'
import { QUERY_LISTINGS, QUERY_MY_CART, QUERY_MY_LISTINGS } from '../../utils/queries'




const Listing = (props) => {
    const [favorite, setFavorite] = useState(false)
    // const [inCart, setInCart] = useState(false)
    const [show, setShow] = useState(false)
    // const handleClose = () => setShow(false)
    // const handleShow = () => setShow(true)

    const {
        _id,
        title,
        image,
        description,
        price,
        // size,
        // color,
        condition,
        // tags,
        // listing_date,
        // category,
        seller
    } = props.listing

    const [addToCart] = useMutation(ADD_TO_CART, {
        variables: {
            cartId: Auth.getProfile().data?._id,
            listingId: _id,
        },
        refetchQueries: [
            {query: QUERY_MY_CART},
            "QUERY_MY_CART"
        ],
    }
    );

    // const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    //     variables: {
    //         cartId: Auth.getProfile().data?._id,
    //         listingId: _id,
    //     }
    // })
 
    //move this to my Listings since we wont show the users listings on discover page
    const [removeListing] = useMutation(REMOVE_LISTING, {
        variables: {
            listingId: _id,
        },
        refetchQueries: [
            {query: QUERY_MY_LISTINGS},
            "QUERY_MY_LISTINGS",
            {query: QUERY_LISTINGS},
            "QUERY_LISTINGS"
        ],
    });

    const [favoriteListing] = useMutation(FAVORITE_LISTING, {
        variables: {
            listingId: _id
        }
    })

    const toggleFavorite =() => {
        //change favorite button style to show added to favorites
        setFavorite(!favorite)
        favoriteListing()
        if(favorite){
            console.log('added to cart')
        }
    }

    const toggleInCart = () => {

        //if not in cart
        addToCart()
        //if already in cart
        //removeFromCart()

    }


    console.log(Auth.getToken())
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
                            {/* if item is in cart already, change button to remove from cart */}
                                <Button
                                    onClick={toggleInCart}>
                                    Add to Cart
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    onClick={toggleFavorite}>
                                    Save to favorites
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <br />
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
