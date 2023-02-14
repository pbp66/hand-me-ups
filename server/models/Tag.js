import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const tagSchema = new Schema(
	{
		tag: {
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

const Tag = model("Tag", tagSchema);
export default Tag;
