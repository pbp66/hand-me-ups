import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;
import bcrypt from "bcrypt";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			match: [/.+@.+\..+/, "Must match an email address!"],
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
		},
		listings: [
			{
				type: Schema.Types.ObjectId,
				ref: "Listing",
			},
		],
		favorites: [
			{
				type: Schema.Types.ObjectId,
				ref: "Listing",
			},
		],
		orders: [
			{
				type: Schema.Types.ObjectId,
				ref: "Order",
			},
		],
		payment_methods: [
			{
				type: Schema.Types.ObjectId,
				ref: "Payment",
			},
		],
		default_payment: {
			type: Schema.Types.ObjectId,
			ref: "Payment",
		},
		addresses: [
			{
				type: Schema.Types.ObjectId,
				ref: "Address",
			},
		],
		default_address: {
			type: Schema.Types.ObjectId,
			ref: "Address",
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

userSchema.virtual("listingCount").get(function () {
	return this.listings.length;
});

userSchema.virtual("favoritesCount").get(function () {
	return this.favorites.length;
});

userSchema.virtual("orderCount").get(function () {
	return this.orders.length;
});

userSchema.virtual("addressCount").get(function () {
	return this.addresses.length;
});

userSchema.virtual("paymentMethodCount").get(function () {
	return this.payment_methods.length;
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
