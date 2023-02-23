import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { useMutation, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import Auth from '../../utils/auth'
import { useState } from 'react'
import { useStoreContext } from '../../ctx/storeContext'
// import {REMOVE_FROM_CART,ADD_TO_CART, UPDATE_LISTINGS} from '../../ctx/actions'
import { REMOVE_LISTING, ADD_TO_CART, FAVORITE_LISTING, REMOVE_FROM_CART } from '../../utils/mutations'
import { QUERY_LISTINGS, QUERY_MY_CART, QUERY_MY_LISTINGS } from '../../utils/queries'




const Listing = (props) => {
    const [state, dispatch] = useStoreContext()
    const [favorite, setFavorite] = useState(false)
    const [inCart, setInCart] = useState(false)
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
    const { data: cartData, loading, error } = useQuery(QUERY_MY_CART);
    const [addToCart, { data }] = useMutation(ADD_TO_CART);
    const [favoriteListing] = useMutation(FAVORITE_LISTING)


    const handleAddToCart = async (id) => {
        console.log(cartData?.myCart.items)
        console.log(_id)
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
                                {
                                    <>
                                        <Button
                                            disabled={cartData?.myCart.items.some((listing) => listing._id === _id)}
                                            onClick={() => { handleAddToCart(_id) }}>
                                            {cartData?.myCart.items.some((listing) => listing._id === _id)
                                                ? 'Added to Cart!'
                                                : 'Add to Cart!'}
                                        </Button>
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
