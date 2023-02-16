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

function throwUnauthenticatedError() {
	throw new GraphQLError("User is not authenticated", {
		extensions: {
			code: "UNAUTHENTICATED",
			http: { status: 401 },
		},
	});
}

const resolvers = {
	Query: {
		allUsers: async (parent, args, context, info) => {
			return User.find();
		},

		oneUser: async (parent, { userId }, context, info) => {
			return User.findOneById(userId);
		},
		// By adding context to our query, we can retrieve the logged in user without specifically searching for them
		me: async (parent, args, context, info) => {
			if (context.user) {
				return User.findOneById(context.user._id);
			}
			throwUnauthenticatedError();
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
			throwUnauthenticatedError();
		},
		favoriteListings: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findOneById(context.user._id).populate(
					"saved_items"
				);
				return user.saved_items;
			}
			throwUnauthenticatedError();
		},
		// searchListings: async (
		// 	parent,
		// 	{ searchTerms, tags, ...args },
		// 	context,
		// 	info
		// ) => {
		// TODO: Search listing titles and descriptions. May need aggregate: https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find
		// TODO: Create list of matching categories and tags from the tags variable
		// 	Listing.find({});
		// },
		allOrders: async (parent, args, context, info) => {
			return Order.find();
		},
		getOrder: async (parent, { orderId }, context, info) => {
			return Order.findOneById(orderId);
		},
		myOrders: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findOneById(context.user._id).populate(
					"order"
				);
				return user.orders;
			}
			throwUnauthenticatedError();
		},

		allTags: async (parent, args, context, info) => {
			return Tag.find();
		},
		allCategories: async (parent, args, context, info) => {
			return Category.find();
		},
		myPaymentMethods: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findOneById(context.user._id).populate(
					"payment_methods"
				);
				return user.payment_methods;
			}
			throwUnauthenticatedError();
		},
		myAddresses: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findOneById(context.user._id).populate(
					"addresses"
				);
				return user.addresses;
			}
			throwUnauthenticatedError();
		},
		myCart: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findOneById(context.user._id).populate(
					"cart"
				);
				return user.cart;
			}
			throwUnauthenticatedError();
		},
	},

	Mutation: {
		addUser: async (
			parent,
			{ username, email, password },
			context,
			info
		) => {
			console.log(username, email, password);
			const user = await User.create({ username, email, password });
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
			throwUnauthenticatedError();
		},

		// TODO...
		updateMe: async (parent, args, context, info) => {}, // update password, username, etc...

		addListing: async (parent, args, context, info) => {},
		removeListing: async (parent, args, context, info) => {},
		saveListing: async (parent, args, context, info) => {}, // update listing

		favoriteListing: async (parent, args, context, info) => {}, // save listing to favorites list
		removeFavoriteListing: async (parent, args, context, info) => {},

		addOrder: async (parent, args, context, info) => {},
		removeOrder: async (parent, args, context, info) => {},
		updateOrder: async (parent, args, context, info) => {},

		createCart: async (parent, args, context, info) => {},
		removeCart: async (parent, args, context, info) => {},
		addToCart: async (parent, args, context, info) => {},
		removeFromCart: async (parent, args, context, info) => {},

		addAddress: async (parent, args, context, info) => {},
		removeAddress: async (parent, args, context, info) => {},
		updateAddress: async (parent, args, context, info) => {},

		addPaymentMethod: async (parent, args, context, info) => {},
		removePaymentMethod: async (parent, args, context, info) => {},
		updatePaymentMethod: async (parent, args, context, info) => {},

		updateDefaultPaymentMethod: async (parent, args, context, info) => {},
		updateDefaultAddress: async (parent, args, context, info) => {},

		addTag: async (parent, args, context, info) => {},
		removeTag: async (parent, args, context, info) => {},

		addCategory: async (parent, { category, ...args }, context, info) => {
			const category = await Category.create({ category });
		},
		removeCategory: async (
			parent,
			{ categoryId, ...args },
			context,
			info
		) => {
			const category = await Category.findOneById(categoryId);
			Category.findByIdAndDelete(categoryId);
			return category;
		},
	},
};

export default resolvers;
