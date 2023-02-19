import React, { useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import CartItem from '../pages/CartItem';
import Auth from '../utils/auth';



// // const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {

//   const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

//   if (!cart.length) {
//     getCart();
//   }
//   function calculateTotal() {
//     let sum = 0;
//     cart.forEach((item) => {
//       sum += item.price * item.purchaseQuantity;
//     });
//     return sum.toFixed(2);
//   }
//   //getCheckout Query
//   getCheckout({
//     variables: { products: productIds },
//   });

//   if (cartOpen) {
//     return (
//       <div className="cart-closed">
//         <span role="img" aria-label="trash">
//           🛒
//         </span>
//       </div>
//     )
//   }
//   return (
//     <div className="cart">
//       <div className="close" onClick={toggleCart}>
//         [close]
//       </div>
//       <h2>Shopping Cart</h2>
//       {cart.length ? (
//         <div>
//           {cart.map((item) => (
//             <CartItem key={item._id} item={item} />
//           ))}

//           <div className="flex-row space-between">
//             <strong>Total: ${calculateTotal()}</strong>

//             {Auth.loggedIn() ? (
//               <button onClick={submitCheckout}>Checkout</button>
//             ) : (
//               <span>(log in to check out)</span>
//             )}
//           </div>
//         </div>
//       ) : (
//         <h3>
//           <span role="img" aria-label="shocked">
//             😱
//           </span>
//           You haven't added anything to your cart yet!
//         </h3>
//       )}
//     </div>
//   );
}

export default Cart;
