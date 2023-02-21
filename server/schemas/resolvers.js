import { GraphQLError } from "graphql";
import { DateTime } from "luxon";
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
			return User.findById(userId);
		},
		// By adding context to our query, we can retrieve the logged in user without specifically searching for them
		me: async (parent, args, context, info) => {
			if (context.user) {
				return User.findById(context.user._id);
			}
			throwUnauthenticatedError();
		},
		allListings: async (parent, args, context, info) => {
			return Listing.find();
		},
		oneListing: async (parent, {listingId}, context, info) => {
			console.log(listingId)
			return Listing.findById(listingId)
		},
		userListings: async (parent, { userId }, context, info) => {
			const user = await User.findById(userId).populate("listings");
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
				const user = await User.findById(context.user._id).populate(
					"listings"
				);
				const updatedListings = []
				for (const listing of user.listings) {
					if (listing.category) {
						const category = await Category.findById(listing.category)
						if (category) {
							listing.category = category
						}
					}
					updatedListings.push(listing)
				}
				
				return updatedListings;
			}
			throwUnauthenticatedError();
		},
		favoriteListings: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate(
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
			return Order.findById(orderId);
		},
		myOrders: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate(
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
			return await Category.find();
		},
		myPaymentMethods: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate(
					"payment_methods"
				);
				return user.payment_methods;
			}
			throwUnauthenticatedError();
		},
		myAddresses: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate(
					"addresses"
				);
				return user.addresses;
			}
			throwUnauthenticatedError();
		},
		myCart: async (parent, args, context, info) => {
			if (context.user) {
				const user = await User.findById(context.user._id).populate(
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
		//* Set up mutation so a logged in user can only remove their user and no one else's
		removeUser: async (parent, args, context, info) => {
			if (context.user) {
				return User.findOneAndDelete({ _id: context.user._id });
			}
			throwUnauthenticatedError();
		},
		updateMe: async (parent, { user, ...args }, context, info) => {
			try {
				const updatedUser = await User.findByIdAndUpdate(
					context.user._id,
					{
						username: user.username,
						email: user.email,
						password: user.password,
					},
					{ new: true, runValidators: true }
				);
				if (!updatedUser) {
					throw new GraphQLError("User does not exist", {
						extensions: {
							code: "USER NOT FOUND",
							http: { status: 401 },
						},
					});
				}
				return updatedUser;
			} catch (err) {
				console.error(err);
			}
		},
		addListing: async (
			parent,
			{
				listing: {
					title,
					description,
					price,
					condition,
					image,
					category,
					size,
					tags,
					color,
				},
				...args
			},
			context,
			info
		) => {
			const newListing = {};
			newListing["seller"] = context.user._id;
			newListing["listing_date"] = DateTime.now().toISO();
			newListing["title"] = title;
			newListing["description"] = description;
			newListing["price"] = price;
			newListing["condition"] = condition;
			newListing["image"] = image;
			newListing["category"] = await Category.findById(category);

			console.log(context)

			if (size) {
				newListing["size"] = size;
			}
			if (color) {
				newListing["color"] = color;
			}

			let listingTags = [];
			if (tags.length > 0) {
				const foundTags = await Tag.find({
					tag: { $in: tags },
				});
				if (tags.length !== foundTags.length) {
					const allTagIds = [];
					if (foundTags) {
						foundTags.forEach((tag) => allTagIds.push(tag._id));
					}

					//* Filter all tags and return the tags that do not exist in the database
					const tagsToCreate = tags.filter((tagName) => {
						//* Return true for any tags NOT found in the foundTags array
						return !foundTags.find((foundTag) => {
							//* Verify that the current tagName exists within foundTags array
							return foundTag.tag === tagName;
						});
					});
					listingTags = await tagsToCreate.map(
						async (tagName) => await Tag.create({ tagName })
					);
				} else {
					listingTags = foundTags;
				}
			}
			newListing["tags"] = listingTags;
			const listing = await Listing.create({
				...newListing,
			});

			await User.findByIdAndUpdate(context.user._id, {$push: {listings: listing._id}})
			//todo: add _id to listing._id, push in listing array

			return listing
		},
		removeListing: async (
			parent,
			{ listingId, ...args },
			context,
			info
		) => {
			return await Listing.findByIdAndDelete(listingId);
		},
		//* update listing
		saveListing: async (
			parent,
			{ listingId, listing, ...args }, // Listing contains title, description, etc...
			context,
			info
		) => {
			return await Listing.findByIdAndUpdate(
				listingId,
				{
					...listing,
					edit_status: true,
					$push: { edit_dates: DateTime.now().toISO() },
				},
				{ new: true, runValidators: true }
			);
		},
		//* save listing to favorites list
		favoriteListing: async (
			parent,
			{ listingId, ...args },
			context,
			info
		) => {
			const user = await User.findByIdAndUpdate(
				context.user._id,
				{
					$push: { favorites: listingId },
				},
				{ new: true, runValidators: true }
			);
			return user.favorites;
		},
		unFavoriteListing: async (
			parent,
			{ listingId, ...args },
			context,
			info
		) => {
			const user = await User.findByIdAndUpdate(
				context.user._id,
				{
					$pull: { favorites: listingId },
				},
				{ new: true, runValidators: true }
			);
			return user.favorites;
		},
		// TODO
		addOrder: async (parent, args, context, info) => {},
		removeOrder: async (parent, { orderId, ...args }, context, info) => {
			return await Order.findByIdAndDelete(orderId);
		},
		// TODO
		updateOrder: async (parent, args, context, info) => {},

		//only when user is deleted will we delete a cart
		removeCart: async (parent, { cartId, ...args }, context, info) => {
			return await Cart.findByIdAndDelete(cartId);
		},
		addToCart: async (
			parent,
			{ cartId, listingId, ...args }, // TODO: Do we need cartId if it is a part of the user object?
			context,
			info
		) => {
			return await Cart.findByIdAndUpdate(
				cartId,
				{ $push: { listingId } },
				{ new: true, runValidators: true }
			);
		},
		removeFromCart: async (
			parent,
			{ cartId, listingId, ...args }, // TODO: Do we need cartId if it is a part of the user object?
			context,
			info
		) => {
			return await Cart.findByIdAndUpdate(
				cartId,
				{ $pull: { listingId } },
				{ new: true, runValidators: true }
			);
		},
		addAddress: async (parent, { address, ...args }, context, info) => {
			const user = await User.findByIdAndUpdate(
				context.user._id,
				{
					$push: { address },
				},
				{ new: true, runValidators: true }
			);
			return user.addresses;
		},
		removeAddress: async (
			parent,
			{ addressId, ...args },
			context,
			info
		) => {
			return await Address.findByIdAndDelete(addressId);
		},
		updateAddress: async (
			parent,
			{ addressId, address, ...args },
			context,
			info
		) => {
			return await Address.findByIdAndUpdate(
				addressId,
				{ ...address },
				{ new: true, runValidators: true }
			);
		},
		addPaymentMethod: async (
			parent,
			{ payment, ...args },
			context,
			info
		) => {
			const user = await User.findByIdAndUpdate(
				context.user._id,
				{
					$push: { payment },
				},
				{ new: true, runValidators: true }
			);
			return user.payment_methods;
		},
		removePaymentMethod: async (
			parent,
			{ paymentId, ...args },
			context,
			info
		) => {
			return await Payment.findByIdAndDelete(paymentId);
		},
		updatePaymentMethod: async (
			parent,
			{ paymentId, payment, ...args },
			context,
			info
		) => {
			return await Payment.findByIdAndUpdate(
				paymentId,
				{ ...payment },
				{ new: true, runValidators: true }
			);
		},
		updateDefaultPaymentMethod: async (
			parent,
			{ payment, ...args },
			context,
			info
		) => {
			return await User.findByIdAndUpdate(
				context.user._id,
				{ default_payment: payment },
				{ new: true, runValidators: true }
			);
		},
		updateDefaultAddress: async (
			parent,
			{ address, ...args },
			context,
			info
		) => {
			return await User.findByIdAndUpdate(
				context.user._id,
				{ default_address: address },
				{ new: true, runValidators: true }
			);
		},
		addTag: async (parent, { tag, ...args }, context, info) => {
			return await Tag.create({ tag });
		},
		removeTag: async (parent, { tagId, ...args }, context, info) => {
			return await Tag.findByIdAndDelete(tagId);
		},
		addCategory: async (parent, { category, ...args }, context, info) => {
			return await Category.create({ category });
		},
		removeCategory: async (
			parent,
			{ categoryId, ...args },
			context,
			info
		) => {
			return await Category.findByIdAndDelete(categoryId);
		},
	},
};

export default resolvers;
