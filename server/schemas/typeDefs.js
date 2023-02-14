const typeDefs = gql`
  	type User {
    	_id: ID!
    	username: String!
    	email: String!
    	password: String!
		listings: [Listing]
		saved_items: [Listing]
		orders: [Order]
		payment_methods: [Payment]
  	}

  	type Auth {
    	token: ID!
    	user: User
  	}

	type Listing {
		_id: ID!
		title: String!
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

	type Order { # TODO: Ensure listings is the defacto
		_id: ID!
		date_purchased: String!
		purchased_listings: [Listing]
		billing_address: Address!
		shipping_address: Address
		purchaser: User!
		payment_method: Payment!
		subtotal: Float!
		shipping_handling: Float!
		pretax_total: Float!
		estimated_tax: Float!
		order_total: Float!
	}

	type Payment { # TODO: Need to review for feasibility/use with Stripe. Encrypted all strings below? We don't want to save the actual value. Is this handled by Stripe?
		_id: ID!
		card_number: String!
		card_type: String!
		expiration_date: String!
		security_code: String!
	}

	type Address { # TODO: Encrypt user address data?
		_id: ID!
		user: User
		building_number: String!
		street: String!
		city: String!
		state: String!
		zip_code: String!
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
