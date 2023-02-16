import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
	query allUsers {
		users {
			_id
			name
			skills
		}
	}
`;

export const QUERY_SINGLE_USER = gql`
	query singleUser($userId: ID!) {
		user(userId: $userId) {
			_id
			name
			skills
		}
	}
`;

export const QUERY_ME = gql`
	query me {
		me {
			_id
			name
			skills
		}
	}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_LISTINGS = gql `
query listings{
	listing{
		_id
		title
		description
		price
		categories
		tags
		size
		color
		condition
		image
	}

}`
