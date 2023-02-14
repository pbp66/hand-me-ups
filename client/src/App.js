import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Discover from "./pages/Discover";
import SavedItems from "./pages/SavedItems"
import MyListings from "./pages/MyListings"
import ShoppingCart from "./pages/ShoppingCart"
import Login from "./pages/Login";
import PurchaseHistory from "./pages/PurchaseHistory"
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout"

import Header from "./components/Header";
import Footer from "./components/Footer";


const httpLink = createHttpLink({
	uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("id_token");
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="flex-column justify-flex-start min-100-vh">
					<Header />
					<div className="container">
						<Routes>
							<Route path="/" element={<Discover />} />
							<Route path="/SavedItems" element={<SavedItems />} />
							<Route path="/MyListings" element={<MyListings />} />
							<Route path="/ShoppingCart" element={<ShoppingCart />} />
							<Route path="/Login" element={<Login />} />
							<Route path="/PurchaseHistory" element={<PurchaseHistory />} />
							<Route path="/Signup" element={<Signup />} />
							<Route path="/Checkout" element={<Checkout />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
