import { GraphQLError } from "graphql";
import {
	User,
	Listing,
	Tag,
	Category,
	Order,
	Payment,
	Address,
	Cart,
} from "../models";
import { signToken } from "../utils/auth";

const resolvers = {
	Query: {
		users: async (parent, args, context, info) => {
			return User.find();
		},

		user: async (parent, { userId }, context, info) => {
			return User.findOneById(userId);
		},
		// By adding context to our query, we can retrieve the logged in user without specifically searching for them
		me: async (parent, args, context, info) => {
			if (context.user) {
				return User.findOneById(context.user._id);
			}
			throw new GraphQLError("User is not authenticated", {
				extensions: {
					code: "UNAUTHENTICATED",
					http: { status: 401 },
				},
			});
		},
		allListings: async (parent, args, context, info) => {
			return Listing.find();
		},
		userListings: async (parent, { userId }, context, info) => {
			const user = await User.findOneById(userId).populate("listings");
			if (!user) {
				throw new GraphQLError("User does not exist", {
					extensions: {
						code: "USER NOT FOUND",
						http: { status: 401 },
					},
				});
			}
			return user.listings;
		},
		myListings: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findOneById(context.user._id).populate(
					"listings"
				);
				return user.listings;
			}
			throw new GraphQLError("User is not authenticated", {
				extensions: {
					code: "UNAUTHENTICATED",
					http: { status: 401 },
				},
			});
		},
		favoriteListings: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findOneById(context.user._id).populate(
					"saved_items"
				);
				return user.saved_items;
			}
			throw new GraphQLError("User is not authenticated", {
				extensions: {
					code: "UNAUTHENTICATED",
					http: { status: 401 },
				},
			});
		},
		searchListings: async (
			parent,
			{ searchTerms, tags, ...args },
			context,
			info
		) => {
			// TODO: Search listing titles and descriptions. May need aggregate: https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find
			// TODO: Create list of matching categories and tags from the tags variable
			Listing.find({});
		},
		allOrders: async (parent, args, context, info) => {
			return Order.find();
		},
		getOrder: async (parent, { orderId }, context, info) => {
			return Order.findOneById(orderId);
		},
		userOrders: async (parent, { userId }, context, info) => {
			const user = await User.findOneById(userId).populate("orders");
			if (!user) {
				throw new GraphQLError("User does not exist", {
					extensions: {
						code: "USER NOT FOUND",
						http: { status: 401 },
					},
				});
			}
			return user.orders;
		},
		myOrders: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findOneById(context.user._id).populate(
					"orders"
				);
				return user.orders;
			}
			throw new GraphQLError("User is not authenticated", {
				extensions: {
					code: "UNAUTHENTICATED",
					http: { status: 401 },
				},
			});
		},
	},

	Mutation: {
		addUser: async (parent, { name, email, password }, context, info) => {
			const user = await User.create({ name, email, password });
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }, context, info) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new GraphQLError("User does not exist", {
					extensions: {
						code: "USER NOT FOUND",
						http: { status: 401 },
					},
				});
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new GraphQLError("Wrong Password", {
					extensions: {
						code: "INCORRECT PASSWORD",
						http: { status: 401 },
					},
				});
			}

			const token = signToken(user);
			return { token, user };
		},

		// Set up mutation so a logged in user can only remove their user and no one else's
		removeUser: async (parent, args, context, info) => {
			if (context.user) {
				return User.findOneAndDelete({ _id: context.user._id });
			}
			throw new GraphQLError("User is not authenticated", {
				extensions: {
					code: "UNAUTHENTICATED",
					http: { status: 401 },
				},
			});
		},
	},
};

export default resolvers;
