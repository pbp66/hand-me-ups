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

export const QUERY_SINGLE_USERS = gql`
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
