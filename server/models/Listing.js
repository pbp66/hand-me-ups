import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const listingSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			trim: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: "Tag",
				// required: true,
			},
		],
		size: {
			type: String,
			trim: true,
		},
		color: [
			{
				type: String,
				trim: true,
			},
		],
		condition: {
			type: String,
			enum: [
				"NEW",
				"USED_LIKE_NEW",
				"USED_GOOD",
				"USED_FAIR",
				"USED_POOR",
			],
			default: "NEW",
		},
		image: {
			type: String,
			trim: true,
		},
		seller: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		listing_date: {
			type: String,
			required: true,
			trim: true,
		},
		edit_status: {
			type: Boolean,
			required: true,
			default: false,
		},
		edit_dates: {
			type: String,
			trim: true,
		},
		purchased_status: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

//! NOTE: Adds significant overhead to DB as each additional listing increases the storage requirement to be able to properly search each word of any contained string within the Listing Schema
listingSchema.index({ "$**": "text" }); //* Enables the $text search feature for ALL strings fields on this schema

const Listing = model("Listing", listingSchema);
export default Listing;
