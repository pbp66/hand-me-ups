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
