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
		categories: [
			{
				type: Schema.Types.ObjectId,
				ref: "Category",
				required: true,
			},
		],
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: "Tag",
				required: true,
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
				"USED - LIKE NEW",
				"USED - GOOD",
				"USED - FAIR",
				"USED - POOR",
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
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

const Listing = model("Listing", listingSchema);
export default Listing;
