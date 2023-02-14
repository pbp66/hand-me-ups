const typeDefs = `
  	type User {
    	_id: ID!
    	username: String!
    	email: String!
    	password: String!
		listings: [Listing]
		saved_items: [Listing]
		orders: [Order]
		payment_method: [Payment]
  	}

  	type Auth {
    	token: ID!
    	user: User
  	}

	type Listing {
		_id: ID!
		description: String!
		price: Float!
		categories: [String]
		tags: [String]
		size: String
		color: [String]
		condition: Condition!
		image: [String] # Link to image in firebase?
		seller: User
		listing_date: String! # Date represented as a string?
		edit_status: Boolean!
		edit_dates: [String] # Date represented as a string?
	}

	enum Condition {
		NEW
		USED - LIKE NEW
		USED - GOOD
		USED - FAIR
		USED - POOR
	}

  	type Query {
    	users: [User]!
    	user(userId: ID!): User
    	# Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    	me: User
  	}

  	type Mutation {
    	addUser(username: String!, email: String!, password: String!): Auth
    	login(email: String!, password: String!): Auth
    	removeUser: User
  	}
`;

export default typeDefs;
