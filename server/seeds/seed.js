import mongoose from "mongoose";
import RandomGenerator from "random-seed-generator";
import db from "../config/connection";
import { Category, Listing, Tag, User } from "../models";
import userSeeds from "./userSeeds.json" assert { type: "json" };
import categorySeeds from "./categories.json" assert { type: "json" };
import tagSeeds from "./tags.json" assert { type: "json" };
import listingSeeds from "./listings.json" assert { type: "json" };

const mockIt = (modifier = Math.random()) => {
	let mock = RandomGenerator.createWithSeeds("Mock" + modifier).hexString(24);
	return mock;
};

const mockObjectId = (str, options) => {
	const { plainText = false } = options || {};
	const id = mongoose.Types.ObjectId(mockIt(str));
	return plainText ? id.toString() : id;
};
//console.log(mockObjectId("a string", {}));

db.once("open", async () => {
	try {
		await User.deleteMany();
		await Category.deleteMany();
		await Tag.deleteMany();
		await Listing.deleteMany();

		// const categories = await Category.insertMany([
		// 	{ category: "Shirt" },
		// 	{ category: "Hat" },
		// 	{ category: "JNCOS" },
		// ]);
		// const tags = await Tag.insertMany([
		// 	{ tag: "testTag1" },
		// 	{ tag: "testTag2" },
		// ]);

		await Category.create(categorySeeds);
		await tags.create(tagSeeds);

		await Listing.insertMany([
			{
				title: "JNCOS",
				description: `${mockObjectId("id")}`,
				price: 120,
				category: categories[0]._id,
				tags: [tags[0]._id, tags[1]._id],
				size: "XXL",
				color: ["red"],
				condition: "NEW",
				image: "https://via.placeholder.com/1000",
				listing_date: "listed today",
				seller: mockObjectId("seller"),
			},
			{
				title: "JNCOS2",
				description: `${mockObjectId("id2")}`,
				price: 120,
				category: categories[0]._id,
				tags: [tags[0]._id, tags[1]._id],
				size: "XXXL",
				color: ["red", "green", "blue"],
				condition: "NEW",
				image: "https://via.placeholder.com/1000",
				listing_date: "listed today",
				seller: mockObjectId("seller"),
			},
		]);
		let allListings = await Listing.find();
		allListings = allListings.map((listing) => listing._id);

		await User.create(userSeeds);
		await User.create({
			email: "test@test.com",
			username: "test",
			password: "password",
			listings: allListings,
		});

		const user = await User.findOne({ username: "test" });
		console.log(user);
		console.log("all done!");
		process.exit(0);
	} catch (err) {
		throw err;
	}
});
