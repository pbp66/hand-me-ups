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
import Favorites from "./pages/Favorites"
import MyListings from "./pages/MyListings"
import Cart from "./pages/Cart"
import Login from "./pages/Login";
import PurchaseHistory from "./pages/PurchaseHistory"
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout"
import Detail from "./pages/Detail"
import Auth from './utils/auth'
import Header from "./components/Header";
import Footer from "./components/Footer";





const httpLink = createHttpLink({
	uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = Auth.getToken();
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
	const myStyle = {
		backgroundImage:
			"url('assets/retro-header.png')"
	}
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="flex-column justify-flex-start min-100-vh">
						<Header />
						<div className="container" style={myStyle}>
							<Routes>
								<Route path="/" element={<Discover />} />
								<Route path="/Favorites" element={<Favorites />} />
								<Route path="/MyListings/:id" element={<MyListings />} />
								<Route path="/Cart" element={<Cart />} />
								<Route path="/Login" element={<Login />} />
								<Route path="/PurchaseHistory" element={<PurchaseHistory />} />
								<Route path="/Signup" element={<Signup />} />
								<Route path="/listings/:id" element={<Detail />} />
								{/* <Route path="/Checkout" element={<Checkout />} /> */}
							</Routes>
						</div>
						<Footer />
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
