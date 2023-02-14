import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const orderSchema = new Schema(
	{
		date_purchased: {
			type: String,
			required: true,
			trim: true,
		},
		purchased_listings: [
			{
				type: Schema.Types.ObjectId,
				ref: "Listing",
				required: true,
			},
		],
		billing_address: {
			type: Schema.Types.ObjectId,
			ref: "Address",
			required: true,
		},
		shipping_address: {
			type: Schema.Types.ObjectId,
			ref: "Address",
		},
		purchaser: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		payment_method: {
			type: Schema.Types.ObjectId,
			ref: "Payment",
			required: true,
		},
		subtotal: {
			type: Number,
			required: true,
			min: 0,
		},
		shipping_handling: {
			type: Number,
			required: true,
			min: 0,
		},
		pretax_total: {
			type: Number,
			required: true,
			min: 0,
		},
		estimated_tax: {
			type: Number,
			required: true,
			min: 0,
		},
		order_total: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

const Order = model("Order", orderSchema);
export default Order;
