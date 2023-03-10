const typeDefs = `
  	type User {
    	_id: ID!
    	username: String!
    	email: String!
    	password: String!
		listings: [Listing]
		favorites: [Listing]
		orders: [Order]
		payment_methods: [Payment]
		addresses: [Address]
		default_address: Address
		default_payment: Payment
		cart: Cart
  	}

	input updateUserInput {
    	username: String
    	email: String
    	password: String
	}

	type Auth {
    	token: ID!
    	user: User
  	}

	type Listing { # TODO: Schema does not allow for listing inventories greater than 1 item per listing
		_id: ID!
		title: String!
		description: String!
		price: Float!
		category: Category!
		tags: [Tag]
		size: String
		color: [String]
		condition: Condition!
		image: String! # Link to image in firebase?
		seller: User # Grab from resolver context
		listing_date: String! # Date represented as a string
		edit_status: Boolean! # Default of false unless updated through saveListing mutation
		edit_dates: [String] # Date represented as a string
		purchase_status: Boolean!
	}

	enum Condition {
		NEW
		USED_LIKE_NEW
		USED_GOOD
		USED_FAIR
		USED_POOR
	}

	input listingInput {
		title: String!
		description: String!
		price: Float!
		category: String # Convert to category schema in resolver
		tags: [String] # Convert to tag schema in resolver
		size: String
		color: [String]
		condition: Condition!
		image: String! # Link to image in firebase?
	}

	type Tag {
		_id: ID
		tag: String
	}

	type Category {
		_id: ID
		category: String
	}

	type Order { # TODO: Ensure listings is the default item to save/link. Otherwise, Id can be used. 
		_id: ID!
		date_purchased: String!
		purchased_listings: [Listing]!
		billing_address: Address!
		shipping_address: Address # Only needed if billing and shipping address are separate
		purchaser: User!
		payment_method: Payment!
		subtotal: Float!
		shipping_handling: Float!
		pretax_total: Float!
		estimated_tax: Float!
		order_total: Float!
	}

	input orderInput {
		cart: [cartInput]
		payment_method: paymentInput
		billing_address: addressInput
		shipping_address: addressInput
	}

	type Payment { # TODO: Need to review for feasibility/use with Stripe. Encrypted all strings below? We don't want to save the actual value. Is this handled by Stripe?
		_id: ID!
		user: User!
		card_number: String!
		card_brand: String!
		expiration_date: String!
		security_code: String!
	}

	input paymentInput {
		card_number: String
		card_brand: String
		expiration_date: String
		security_code: String
	}

	type Address { # TODO: Encrypt user address data?
		_id: ID!
		user: User!
		building_number: String!
		street: String!
		city: String!
		state: String!
		zip_code: String!
	}

	input addressInput {
		building_number: String
		street: String
		city: String
		state: String
		zip_code: String
	}

	type Cart {
		_id: ID!
		user: User!
		items: [Listing]
	}
	
	type Checkout {
		session: ID
	  }

	input cartInput { # Identical to Listing, but input types require scalars or other inputs...
		title: String
		description: String
		price: Float
		size: String
		color: [String]
		image: String # Link to image in firebase?
		seller_username: String
	}

  	type Query {
    	allUsers: [User]
    	oneUser(userId: ID!): User
		findUserByUsername(username: String!): User
    	# Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    	me: User
		allListings: [Listing]
		oneListing(listingId: ID!): Listing
		userListings(userId: ID!): [Listing]
		myListings: [Listing]
		favoriteListings: [Listing]
		searchListings(searchString: String!): [Listing]
		allOrders: [Order]
		getOrder(orderId: ID!): Order
		myOrders: [Order]
		allTags: [Tag]
		allCategories: [Category]
		myPaymentMethods: [Payment]
		myAddresses: [Address]
		myCart: Cart
		checkout(listing: [ID]!): Checkout
  	}

  	type Mutation {
    	addUser(username: String!, email: String!, password: String!): Auth
    	login(email: String!, password: String!): Auth
    	removeUser: User
		addListing(listing: listingInput!): Listing
		favoriteListing(listingId: ID!): [Listing]
		removeListing(listingId: ID!): User
		addOrder(orderDetails: orderInput!): Order
		updateMe(userId: ID!, user: updateUserInput): User
		saveListing(listingId: ID!, listing: listingInput): Listing
		unFavoriteListing(listingId: ID!): [Listing]
		removeOrder(orderId: ID!): Order
		updateOrder(orderId: ID!, order: orderInput): Order
		removeCart: Cart
		addToCart(listingId: ID!): Cart
		removeFromCart(listingId: ID!): Cart
		addAddress(address: addressInput!): [Address]
		removeAddress(addressId: ID!): [Address]
		updateAddress(addressId: ID!, address: addressInput): [Address]
		addPaymentMethod(payment: paymentInput!): [Payment]
		removePaymentMethod(paymentId: ID!): [Payment]
		updatePaymentMethod(paymentId: ID!, payment: paymentInput): [Payment]
		updateDefaultPaymentMethod(paymentId: ID!): User
		updateDefaultAddress(addressId: ID!): User
		addTag(tag: String!): Tag
		removeTag(tagId: ID!): Tag
		addCategory(category: String!): Category
		removeCategory(categoryId: ID!): Category
  	}
`;

export default typeDefs;
