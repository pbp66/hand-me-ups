import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation addProfile($name: String!, $email: String!, $password: String!) {
		addProfile(name: $name, email: $email, password: $password) {
			token
			profile {
				_id
				name
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			profile {
				_id
				name
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
