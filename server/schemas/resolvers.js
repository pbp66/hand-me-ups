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
			return User.findOne({ _id: userId });
		},
		// By adding context to our query, we can retrieve the logged in user without specifically searching for them
		me: async (parent, args, context, info) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id });
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
				const user = await User.findOne({
					_id: context.user._id,
				}).populate("listings");
				return user.listings;
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
