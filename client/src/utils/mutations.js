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

export const ADD_TO_CART = gql`
mutation ADD_TO_CART($cartId: ID!, $listingId: ID!) {
	addToCart(cartId: $cartId, listingId: $listingId) {
	  _id
	  items {
		_id
		title
		description
		price
		size
		color
		condition
		image
		seller {
		  _id
		}
		listing_date
		edit_status
		edit_dates
	  }
	}
  }
`