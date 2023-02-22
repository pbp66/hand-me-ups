import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
	query ALL_USERS {
		users {
			_id
			username
			email
		}
	}
`;

export const QUERY_SINGLE_USER = gql`
	query SINGLE_USER($userId: ID!) {
		user(userId: $userId) {
			_id
			username
			email
		}
	}
`;

export const QUERY_USER_FROM_USERNAME = gql`
	query USER_FROM_USERNAME($username: String!) {
		findUserByUsername(username: $username) {
			_id
			username
			email
		}
	}
`;

export const QUERY_ME = gql`
	query ME {
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
	query ALL_LISTINGS {
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
	query ONE_LISTING($listingId: ID!) {
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

// TODO: Define what's going on here? We don't have a checkout query in the typeDefs or resolvers...
export const QUERY_CHECKOUT = gql`
	query GET_CHECKOUT($products: [ID]!) {
		checkout(products: $products) {
			session
		}
	}
`;

export const QUERY_USER_LISTINGS = gql`
	query USER_LISTINGS($userId: ID!) {
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
				username
				email
			}
			listing_date
			edit_status
			edit_dates
		}
	}
`;

export const QUERY_MY_LISTINGS = gql`
	query MY_LISTINGS {
		myListings {
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
				username
				email
			}
			listing_date
			edit_status
			edit_dates
		}
	}
`;

export const QUERY_FAVORITE_LISTINGS = gql`
	query FAVORITE_LISTINGS {
		favoriteListings {
			_id
			title
			descriptions
			price
			image
		}
	}
`;

export const QUERY_SEARCH_LISTINGS = gql`
	query SEARCH_LISTINGS($searchString: String!) {
		searchListing(searchString: $searchString) {
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
				username
				email
			}
			listing_date
			edit_status
			edit_dates
		}
	}
`;

export const QUERY_ALL_ORDERS = gql`
	query QUERY_ALL_ORDERS {
		allOrders {
			_id
			date_purchased
			purchased_listings
			billing_address
			shipping_address
			purchaser
			payment_method
			subtotal
			shipping_handling
			pretax_total
			estimated_tax
			order_total
		}
	}
`;

export const QUERY_GET_ONE_ORDER = gql`
	query GET_ONE_ORDER($orderId: ID!) {
		getOrder(orderId: $orderId) {
			_id
			date_purchased
			purchased_listings
			billing_address
			shipping_address
			purchaser
			payment_method
			subtotal
			shipping_handling
			pretax_total
			estimated_tax
			order_total
		}
	}
`;

export const QUERY_MY_ORDERS = gql`
	query MY_ORDERS {
		myOrder {
			_id
			date_purchased
			purchased_listings
			billing_address
			shipping_address
			purchaser
			payment_method
			subtotal
			shipping_handling
			pretax_total
			estimated_tax
			order_total
		}
	}
`;

export const QUERY_ALL_TAGS = gql`
	query ALL_TAGS {
		allTags {
			_id
			tag
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

export const QUERY_MY_PAYMENT_METHODS = gql`
	query MY_PAYMENT_METHODS {
		myPaymentMethods {
			_id
			card_number
			card_brand
			expiration_date
			security_code
		}
	}
`;

export const QUERY_MY_ADDRESSES = gql`
	query MY_ADDRESSES {
		myAddresses {
			_id
			building_number
			street
			city
			state
			zip_code
		}
	}
`;

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
