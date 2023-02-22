import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const categorySchema = new Schema(
	{
		description: {
			type: String,
			minLength: 1,
			trim: true,
			required: true,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

const Category = model("Category", categorySchema);
export default Category;
