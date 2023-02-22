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

export const UNFAVORITE_LISTING = gql`
	mutation UNFAVORITE_LISTING($listingId: ID!) {
		unFavoriteListing(listing: $listingId) {
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

// TODO REMOVE_CART
// export const REMOVE_CART = gql`
// 	mutation REMOVE_CART() {
// 		removeCart() {

// 		}
// 	}`;

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

// TODO REMOVE_PAYMENT_METHOD

// TODO UPDATE_PAYMENT_METHOD

// TODO UPDATE_DEFAULT_PAYMENT

// TODO UPDATE_DEFAULT_ADDRESS

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
