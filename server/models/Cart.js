import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const cartSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Listing",
					
				},
			],
			default: []
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

cartSchema.virtual("cartCount").get(function () {
	return this.items.length;
});

const Cart = model("Cart", cartSchema);
export default Cart;
