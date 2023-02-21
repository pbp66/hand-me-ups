import React, { useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_MY_CART } from '../utils/queries';
import CartItem from '../pages/CartItem';
import Auth from '../utils/auth';



// // const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

 //CHECKOUT METHODS
//cant redirect from back end
// make rediretc happen from getCheckout
//re
 //QUERY ADDRESS AND BUYER SELLER INFO?



 
    return (
       <div>
        <h1>Cart Items Here</h1>
       </div>
    );
}

export default Cart;
