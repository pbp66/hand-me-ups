import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const addressSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		building_number: {
			type: String,
			minLength: 1,
			required: true,
			trim: true,
		},
		street: {
			type: String,
			required: true,
			trim: true,
		},
		city: {
			type: String,
			required: true,
			trim: true,
		},
		state: {
			type: String,
			required: true,
			trim: true,
			minLength: 4,
		},
		zip_code: {
			type: String,
			required: true,
			trim: true,
			minLength: 5,
			maxLength: 5,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

addressSchema.methods.getFullAddress = function () {
	return `${this.building_number} ${this.street} ${this.city}, ${this.state}, ${this.zip_code}`;
};

const Address = model("Address", addressSchema);

export default Address;
