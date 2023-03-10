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
		removeUser {
			_id
			username
			email
			listings
			favorites
			orders
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

export const ADD_ORDER = gql`
	mutation ADD_ORDER($orderInput: orderInput!) {
		addOrder(orderDetails: $orderInput) {
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

export const UNFAVORITE_LISTING = gql`
	mutation UNFAVORITE_LISTING($listingId: ID!) {
		unFavoriteListing(listingId: $listingId) {
			_id
		}
	}
`;

// TODO REMOVE_ORDER
// export const REMOVE_ORDER = gql`
// 	mutation REMOVE_ORDER() {
// 		removeOrder() {

// 		}
// 	}`;

// TODO UPDATE_ORDER
// export const UPDATE_ORDER = gql`
// 	mutation UPDATE_ORDER() {
// 		updateOrder() {

// 		}
// 	}`;

export const REMOVE_CART = gql`
	mutation REMOVE_CART {
		removeCart {
			_id
			items {
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
				purchase_status
			}
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

// TODO ADD_ADDRESS
// export const ADD_ADDRESS = gql`
// 	mutation ADD_ADDRESS() {
// 		addAddress() {

// 		}
// 	}`;

// TODO REMOVE_ADDRESS
// export const REMOVE_ADDRESS = gql`
// 	mutation REMOVE_ADDRESS() {
// 		removeAddress() {

// 		}
// 	}`;

// TODO UPDATE_ADDRESS
// export const UPDATE_ADDRESS = gql`
// 	mutation UPDATE_ADDRESS() {
// 		updateAddress() {

// 		}
// 	}`;

// TODO ADD_PAYMENT_METHOD
// export const ADD_PAYMENT_METHOD = gql`
// 	mutation ADD_PAYMENT_METHOD() {
// 		addPaymentMethod() {

// 		}
// 	}`;

// TODO REMOVE_PAYMENT_METHOD
// export const REMOVE_PAYMENT_METHOD = gql`
// 	mutation REMOVE_PAYMENT_METHOD() {
// 		removePaymentMethod() {

// 		}
// 	}`;

// TODO UPDATE_PAYMENT_METHOD
// export const UPDATE_PAYMENT_METHOD = gql`
// 	mutation UPDATE_PAYMENT_METHOD() {
// 		updatePaymentMethod() {

// 		}
// 	}`;

// TODO UPDATE_DEFAULT_PAYMENT
// export const UPDATE_DEFAULT_PAYMENT = gql`
// 	mutation UPDATE_DEFAULT_PAYMENT() {
// 		updateDefaultPaymentMethod() {

// 		}
// 	}`;

// TODO UPDATE_DEFAULT_ADDRESS
// export const UPDATE_DEFAULT_ADDRESS = gql`
// 	mutation UPDATE_DEFAULT_ADDRESS() {
// 		updateDefaultAddress() {

// 		}
// 	}`;

export const ADD_TAG = gql`
	mutation ADD_TAG($tag: String) {
		addTag(tag: $tag) {
			_id
			tag
		}
	}
`;

export const REMOVE_TAG = gql`
	mutation REMOVE_TAG($tagId: ID!) {
		removeTag(tagId: $tagId) {
			_id
			tag
		}
	}
`;

export const ADD_CATEGORY = gql`
	mutation ADD_CATEGORY($category: String!) {
		addCategory(category: $category)
	}
`;

export const REMOVE_CATEGORY = gql`
	mutation REMOVE_CATEGORY($categoryId: ID!) {
		removeCategory(categoryId: $categoryId)
	}
`;
