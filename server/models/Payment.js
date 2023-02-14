import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const paymentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		card_number: {
			type: String,
			required: true,
			trim: true,
		},
		card_brand: {
			type: String,
			required: true,
			trim: true,
		},
		security_code: {
			type: String,
			required: true,
			trim: true,
		},
		expiration_date: {
			type: String,
			required: true,
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

// TODO: ALL DATA WITHIN THIS SCHEMA MUST BE ENCRYPTED! ONLY THE END-USER SHOULD SEE THE RAW DATA

const Payment = model("Payment", paymentSchema);
export default Payment;
