import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import Grid from '../components/Grid';
import Listing from '../components/Listing';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react'
import { QUERY_MY_CART } from '../utils/queries';
import Auth from '../utils/auth';

// // const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


const Cart = () => {
    const { data: cartData, loading, error } = useQuery(QUERY_MY_CART);
    if (loading) return <p>loading</p>
    if (error) return <p>error {error.message} </p>
    const myCart = cartData?.myCart?.items || [];

    //CHECKOUT METHOD
    //cant redirect from back end
    // make redirect happen from getCheckout

    return (<>
        <h1>My Cart</h1>
        <Grid colCount={4} md={3}>
            {myCart.map(listing => {
                return (
                    <>
                        <Listing
                            key={listing._id}
                            listing={listing}
                        />
                        <>
                        </>
                    </>)
            })}
        </Grid>
    </>
    );
}

export default Cart;
