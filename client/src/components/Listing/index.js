import { Card, Button, Container, Row, Col, ButtonGroup } from 'react-bootstrap'

import { parseAndCheckHttpResponse, useMutation, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import Auth from '../../utils/auth'
import { useState } from 'react'
import { REMOVE_LISTING, ADD_TO_CART, FAVORITE_LISTING, REMOVE_FROM_CART, UNFAVORITE_LISTING } from '../../utils/mutations'
import { QUERY_FAVORITE_LISTINGS, QUERY_LISTINGS, QUERY_MY_CART, QUERY_MY_LISTINGS } from '../../utils/queries'




const Listing = (props) => {

    const [show, setShow] = useState(true)
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
    const { data: cartData } = useQuery(QUERY_MY_CART);
    const { data: favoriteData } = useQuery(QUERY_FAVORITE_LISTINGS)
    console.log(favoriteData)
    const [removeFromCart] = useMutation(REMOVE_FROM_CART)
    const [unFavoriteListing] = useMutation(UNFAVORITE_LISTING)
    const [addToCart, { data }] = useMutation(ADD_TO_CART);
    const [favoriteListing] = useMutation(FAVORITE_LISTING)
    console.log(unFavoriteListing)
    const handleAddToCart = async (id) => {
        await addToCart({
            variables: {
                listingId: id,
            },
            refetchQueries: [
                { query: QUERY_MY_CART },
                "QUERY_MY_CART"
            ],
        })
    }

    const handleRemoveFromCart = async (id) => {
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
                listingId: id
            },
            refetchQueries: [
                { query: QUERY_FAVORITE_LISTINGS },
                "FAVORITE_LISTINGS"
            ],
        })
    }

    const handleUnfavorite = async (id) => {
        await unFavoriteListing({
            variables: {
                listingId: id
            },
            refetchQueries: [
                { query: QUERY_FAVORITE_LISTINGS },
                "FAVORITE_LISTINGS"
            ],
        })
    }

    const checkSeller = () => {
        return Auth.loggedIn() && Auth.getProfile().data?._id !== seller?._id
    }
    const inCart = () => {
        return cartData?.myCart.items.some((listing) => listing._id === _id)
    }

    const isFav = () => {
        return favoriteData?.favoriteListings.some((listing) => listing._id === _id)
    }

    console.log(`Token for graphql header ${Auth.getToken()}`)
    return (
        <>
            <Link
                to={`/listings/${_id}`}>
                <Card
                // onMouseEnter={() => setShow(true)}
                // onMouseLeave={() => setShow(false)}
                >

                    <Card.Body>
                        <Card.Img src={image}></Card.Img>
                        <Card.Header>{title}</Card.Header>
                        <Card.Text>seed userID  {description}</Card.Text>
                        <Card.Footer>{condition}${price}
                        </Card.Footer>
                    </Card.Body>

                </Card>
            </Link>
            {checkSeller() ?
                <>
                    <center
                    text-align='justify'>
                        {
                            <> {inCart()
                                ?
                                <button
                                    onClick={() => { handleRemoveFromCart(_id) }}><span role="img" aria-label="trash">
                                        ← 🛒
                                    </span>
                                </button>
                                :
                                <button
                                    onClick={() => { handleAddToCart(_id) }}>
                                    → 🛒
                                </button>
                            }
                            </>
                        }
                        
                        {
                            <>
                                {isFav()
                                    ?
                                    <button
                                        onClick={() => { handleUnfavorite(_id) }}
                                    >
                                        ★
                                    </button>
                                    :
                                    <button
                                        onClick={() => { handleFavoriteListing(_id) }}>
                                        ☆
                                    </button>
                                }
                            </>
                        }
                        </center>
                        <br />
                    </>
                    :
                    <>
                    </>
            }
                </>
    )
}

            export default Listing
