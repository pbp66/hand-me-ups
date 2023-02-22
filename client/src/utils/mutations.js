import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
				email
				password
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const REMOVE_USER = gql`
	mutation REMOVE_USER {
		removeUser() {
			_id
			username
			email
			listings
			favorites
			orders
		}
	}`;

export const ADD_LISTING = gql`
	mutation ADD_LISTING($listing: listingInput!) {
		addListing(listing: $listing) {
			_id
			title
			description
			price
			category {
				_id
				category
			}
			tags {
				_id
				tag
			}
			size
			color
			condition
			image
			listing_date
		}
	}
`;

export const FAVORITE_LISTING = gql`
	mutation FAVORITE_LISTING($listingId: ID!) {
		favoriteListing(listingId: $listingId) {
			_id
		}
	}
`;

export const REMOVE_LISTING = gql`
	mutation REMOVE_LISTING($listingId: ID!) {
		removeListing(listingId: $listingId) {
			_id
		}
	}
`;

// TODO ADD_ORDER
// export const ADD_ORDER = gql`
// 	mutation ADD_ORDER() {
// 		addOrder() {

// 		}
// 	}`;

// TODO UPDATE_ME
// export const UPDATE_ME = gql`
// 	mutation UPDATE_ME() {
// 		updateMe() {

// 		}
// 	}`;

// TODO SAVE_LISTING
// export const SAVE_LISTING = gql`
// 	mutation SAVE_LISTING() {
// 		saveListing() {

// 		}
// 	}`;

// TODO UNFAVORITE_LISTING
export const UNFAVORITE_LISTING = gql`
	mutation UNFAVORITE_LISTING($listingId: ID!) {
		unFavoriteListing(listing: $listingId) {
		_id
		title
		description
		price
		category
		tags
		size
		color
		condition
		image
		listing_date
		}
	}`
	
		removeOrder(orderId: ID!): Order
		updateOrder(orderId: ID!, order: orderInput): Order
		removeCart: Cart

export const ADD_TO_CART = gql`
	mutation ADD_TO_CART($listingId: ID!) {
		addToCart(listingId: $listingId) {
			_id
		}
	}
`;

export const REMOVE_FROM_CART = gql`
	mutation REMOVE_FROM_CART($listingId: ID!) {
		removeFromCart(listingId: $listingId) {
			_id
		}
	}
`;
