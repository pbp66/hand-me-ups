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
query QUERY_LISTINGS {
	allListings {
	  _id
	  title
	  description
	  price
	  category {
		_id
	  }
	  tags {
		_id
	  }
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
  
`;

export const QUERY_ALL_CATEGORIES = gql`
	query ALL_CATEGORIES {
		allCategories {
			_id
			category
		}
	}
`;

export const QUERY_MY_CART = gql`
query QUERY_MY_CART {
	myCart {
	  _id
	  items {
		_id
		title
		description
		price
		category {
		  category
		}
		tags {
		  tag
		}
		size
		color
		condition
		image
		seller {
		  username
		}
		listing_date
		edit_status
		edit_dates
	  }
	}
  }`

export const QUERY_USER_LISTINGS = gql`
  query QUERY_USER_LISTINGS($userId: ID!) {
	userListings(userId: $userId) {
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
	  seller {
		_id
	  }
	  listing_date
	  edit_status
	  edit_dates
	}
  }
  `

  export const QUERY_MY_LISTINGS = gql`
  query QUERY_MY_LISTINGS {
    myListings {
      _id
      title
      description
      price
      category {
        category
      }
      tags {
        tag
      }
	  seller {
		_id
	  }
      size
      color
      condition
      image
      listing_date
      edit_status
      edit_dates
    }
  }
  `
