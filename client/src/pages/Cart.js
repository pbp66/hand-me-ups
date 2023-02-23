import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Grid from '../components/Grid';
import Listing from '../components/Listing';
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_MY_CART } from '../utils/queries';
import { useStoreContext } from '../ctx/storeContext';
import { TOGGLE_CART } from '../ctx/actions';
import Auth from '../utils/auth';



// // const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const[state, dispatch] = useStoreContext()
    console.log(state)
    
    const { data, loading, error } = useQuery(QUERY_MY_CART);




    if (loading) return <p>loading</p>
    // console.log(data?.myCart)
    if (error) return <p>error {error.message} </p>
    const myCart = data?.myCart?.items || [];

    //CHECKOUT METHODS
    //cant redirect from back end
    // make rediretc happen from getCheckout
    //re





    return (<>
    <h1>My Cart</h1>
        <Grid colCount={4} md={3}>
            {myCart.map(listing => {
                console.log(listing)
                return (<>
                    <Listing
                        key={listing._id}
                        listing={listing}
                    >
                       <h1>TEST</h1>{listing._id}
                    </Listing>
                </>)
            })}
        </Grid>
    </>
    );
}

export default Cart;
