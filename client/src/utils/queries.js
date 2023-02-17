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

export const QUERY_LISTINGS = gql`
query LISTINGS {
	allListings {
	  categories {
		category
	  }
	  color
	  condition
	  description
	  listing_date
	  price
	  seller {
		username
		addresses {
		  city
		  state
		}
	  }
	  image
	  size
	  tags {
		tag
	  }
	  title
	  edit_status
	}
  }
`


export const QUERY_ALL_CATEGORIES = gql`
query ALL_CATEGORIES{
	allCategories{
		_id
		category
	}
}
`