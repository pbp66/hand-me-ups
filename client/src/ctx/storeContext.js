import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducer'

const StoreContext = createContext();
const { Provider } = StoreContext;

// const defaultListing = {
//   title: "",
//   image: "",
//   description: "",
//   price: 0,
//   categories: [],
//   size: "",
//   tags: [],
//   color: [],
//   condition: "",
// }

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    listings: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
