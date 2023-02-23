import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import Grid from '../components/Grid';
import Listing from '../components/Listing';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { QUERY_MY_CART} from '../utils/queries';
import { REMOVE_FROM_CART } from '../utils/mutations';
import Auth from '../utils/auth';



// // const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const [removeFromCart] = useMutation(REMOVE_FROM_CART)

    const { data: cartData, loading, error } = useQuery(QUERY_MY_CART);




    if (loading) return <p>loading</p>
    // console.log(data?.myCart)
    if (error) return <p>error {error.message} </p>
    const myCart = cartData?.myCart?.items || [];

    //CHECKOUT METHODS
    //cant redirect from back end
    // make rediretc happen from getCheckout
    //re



    const handleRemoveFromCart = async (id) => {
        await removeFromCart({
            variables: {
                listingId: id
            }
        })
    }

    return (<>
        <h1>My Cart</h1>
        <Grid colCount={4} md={3}>
            {myCart.map(listing => {
                
                return (<>
                    <Listing
                        key={listing._id}
                        listing={listing}
                    >
                    </Listing>
                    <>
                        <Button
                            onClick={() => { handleRemoveFromCart(listing._id) }}>
                            Remove from Cart
                        </Button>
                    </>
                </>)
            })}
        </Grid>
    </>
    );
}

export default Cart;
