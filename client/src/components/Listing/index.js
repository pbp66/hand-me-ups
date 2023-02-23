import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { useMutation } from "@apollo/client"
import { Link } from "react-router-dom"
import Auth from '../../utils/auth'
import { useState } from 'react'
import { useStoreContext } from '../../ctx/storeContext'
// import {REMOVE_FROM_CART,ADD_TO_CART, UPDATE_LISTINGS} from '../../ctx/actions'
import { REMOVE_LISTING, ADD_TO_CART, FAVORITE_LISTING, REMOVE_FROM_CART } from '../../utils/mutations'
import { QUERY_LISTINGS, QUERY_MY_CART, QUERY_MY_LISTINGS } from '../../utils/queries'
import styled from 'styled-components'

const AddButton = styled.button `
    background-color: cream;
    color: #3A606E;
    padding: 10px;
    &:hover {
        background-color: #96BBBB;
`
const FavoriteButton = styled.button `
    background-color: #E0E0E0;
     color: #3A606E;
    padding: 10px;
    &:hover {
        background-color: #96BBBB;
`


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

    const [addToCart, { data }] = useMutation(ADD_TO_CART, {
        variables: {
            listingId: _id,
        },
        refetchQueries: [
            { query: QUERY_MY_CART },
            "QUERY_MY_CART"
        ],
    }
    );
console.log(data)
    const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
        variables: {
            listingId: _id,
        }
    })

    //move this to my Listings since we wont show the users listings on discover page
    const [removeListing] = useMutation(REMOVE_LISTING, {
        variables: {
            listingId: _id,
        },
        refetchQueries: [
            { query: QUERY_MY_LISTINGS },
            "QUERY_MY_LISTINGS",
            { query: QUERY_LISTINGS },
            "QUERY_LISTINGS"
        ],
    });

    const [favoriteListing] = useMutation(FAVORITE_LISTING, {
        variables: {
            listingId: _id
        }
    })

    const toggleFavorite = () => {
        //change favorite button style to show added to favorites
        setFavorite(!favorite)
        favoriteListing()
    }

    const toggleInCart = () => {
        setInCart(!inCart)
        console.log(inCart)
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
                                {!inCart ?
                                    <>
                                        <AddButton
                                            onClick={() => { toggleInCart(); addToCart(); }}>
                                            Add to Cart
                                        </AddButton>
                                    </>
                                    :
                                    <>
                                        <Button
                                            onClick={() => { toggleInCart(); removeFromCart(); }}>
                                            Remove From Cart
                                        </Button>
                                    </>
                                }
                            </Col>
                            <Col>
                                <FavoriteButton
                                    onClick={toggleFavorite}>
                                    Save to favorites
                                </FavoriteButton>
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
