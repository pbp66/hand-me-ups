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

// export const ADD_LISTING = gql`
// 	mutation addListing(
// 		$title: String!
// 		$description: String!
// 		$price: String!
// 		$categories: [Category!]
// 		$tags: [Tag]
// 		$size: String!
// 		$color: [String!]
// 		$condition: String!
// 		$image: String!
// 		)
// 		{
// 			listing{
// 				_id
// 			}
			
// 		}`
