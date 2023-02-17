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
