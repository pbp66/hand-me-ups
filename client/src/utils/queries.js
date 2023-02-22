import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
	query allUsers {
		users {
			_id
			username
			email
		}
	}
`;

export const QUERY_SINGLE_USER = gql`
	query singleUser($userId: ID!) {
		user(userId: $userId) {
			_id
			username
			email
		}
	}
`;

export const QUERY_ME = gql`
	query me {
		me {
			_id
			username
			email
			listings
			favorites
			orders
			payment_methods
			addresses
			default_address
			default_payment
			cart
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
`;

export const QUERY_ONE_LISTING = gql`
	query QUERY_ONE_LISTING($listingId: ID!) {
		oneListing(listingId: $listingId) {
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
`;

export const QUERY_CHECKOUT = gql`
	query getCheckout($products: [ID]!) {
		checkout(products: $products) {
			session
		}
	}
`;

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
`;

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
`;

export const QUERY_FAVORITE_LISTINGS = gql`
	query QUERY_FAVORITE_LISTINGS {
		favoriteListings {
			_id
			title
			descriptions
			price
			image
		}
	}
`;

// TODO SEARCH_LISTINGS

// TODO ALL_ORDERS

// TODO GET_ORDER

// TODO MY_ORDER

// TODO ALL_TAGS

export const QUERY_ALL_CATEGORIES = gql`
	query ALL_CATEGORIES {
		allCategories {
			_id
			category
		}
	}
`;

// TODO MY_PAYMENT_METHODS

// TODO MY_ADDRESSES

export const QUERY_MY_CART = gql`
	query MY_CART {
		myCart {
			_id
			items {
				_id
				title
				price
				image
				seller {
					_id
				}
			}
		}
	}
`;
