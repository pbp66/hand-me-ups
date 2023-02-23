import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { useMutation, useQuery } from "@apollo/client"
import { Link, useParams } from "react-router-dom"
import Auth from '../../utils/auth'
import { useState } from 'react'
import { useStoreContext } from '../../ctx/storeContext'
// import {REMOVE_FROM_CART,ADD_TO_CART, UPDATE_LISTINGS} from '../../ctx/actions'
import { REMOVE_LISTING, ADD_TO_CART, FAVORITE_LISTING, REMOVE_FROM_CART } from '../../utils/mutations'
import { QUERY_LISTINGS, QUERY_MY_CART, QUERY_MY_LISTINGS } from '../../utils/queries'


const Listing = (props) => {
    console.log(useParams())
    const [show, setShow] = useState(true)
    const [toggle, setToggle] = useState(true)
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
    const { data: cartData, loading, error } = useQuery(QUERY_MY_CART);
    const [removeFromCart] = useMutation(REMOVE_FROM_CART)
    const [addToCart, { data }] = useMutation(ADD_TO_CART);
    const [favoriteListing] = useMutation(FAVORITE_LISTING)

    console.log(cartData)
    const handleAddToCart = async (id) => {
        console.log(cartData?.myCart.items)
        setToggle(!toggle)
        await addToCart({
            variables: {
                listingId: _id,
            },
            refetchQueries: [
                { query: QUERY_MY_CART },
                "QUERY_MY_CART"
            ],
        })
    }

    const handleRemoveFromCart = async (id) => {
        setToggle(!toggle)
        await removeFromCart({
            variables: {
                listingId: id
            },
            refetchQueries: [
                { query: QUERY_MY_CART },
                "QUERY_MY_CART"
            ],
        })
    }

    const handleFavoriteListing = async (id) => {
        await favoriteListing({
            variables: {
                listingId: _id
            }
        })
    }
    // console.log(`Token for graphql header ${Auth.getToken()}`)
    return (
        <>
            <Link
                to={`/listings/${_id}`}>
                <Card
                // onMouseEnter={() => setShow(true)}
                // onMouseLeave={() => setShow(false)}
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
                                {
                                    <> {cartData?.myCart.items.some((listing) => listing._id === _id)
                                        ?
                                        <Button
                                            onClick={() => { handleRemoveFromCart(_id) }}>
                                            Remove from Cart
                                        </Button>
                                        :
                                        <Button
                                            onClick={() => { handleAddToCart(_id) }}>
                                            Add to Cart
                                        </Button>
                                    }
                                    </>
                                }
                            </Col>
                            <Col>
                                <Button
                                    onClick={() => { handleFavoriteListing(_id) }}>
                                    Save to favorites
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <br />
                </>
                :
                <></>
            }
        </>
    )
}

export default Listing
