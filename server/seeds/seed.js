import db from "../config/connection";
import { Category, Listing, User } from "../models";
import userSeeds from "./userSeeds.json" assert { type: "json" };
import mongoose from 'mongoose'
import RandomGenerator from "random-seed-generator"


const mockIt = (modifier = Math.random()) => {
	let mock = RandomGenerator.createWithSeeds("Mock" + modifier).hexString(24)
	console.log(mock)
	return mock
}

const mockObjectId = (str, options) => {
	const { plainText = false } = options || {};
	const id = mongoose.Types.ObjectId(mockIt(str));
	return plainText ? id.toString() : id;
};
console.log(mockObjectId('a string', {}))
db.once("open", async () => {
	try {

		await User.deleteMany({});
		await Category.deleteMany();
		await Listing.deleteMany({});
		await Category.insertMany([
			{ category: "Shirt" },
			{ category: "Hat" },
			{ category: "JNCOS" },
		]);
		await Listing.insertMany([
			{
				title: "JNCOS",
				description: `${mockObjectId('id')}`,
				price: 120,
				category: mockObjectId('category'),
				tags: [mockObjectId('tag'), mockObjectId('tag2')],
				size: "XXL",
				color: ["red"],
				condition: "NEW",
				image: "https://via.placeholder.com/1000",
				listing_date: "listed today",
				seller: mockObjectId('seller')
			},
			{
				title: "JNCOS2",
				description: `${mockObjectId('id')}`,
				price: 120,
				category: mockObjectId('category'),
				tags: [mockObjectId('tag'), mockObjectId('tag2')],
				size: "XXXL",
				color: ["red", "green", "blue"],
				condition: "NEW",
				image: "https://via.placeholder.com/1000",
				listing_date: "listed today",
				seller: mockObjectId('seller')
			}
		])
		let allListings = await Listing.find()
		allListings = await allListings.map(listing => listing._id)
		
		await User.create(userSeeds);
		await User.create({
			email: "test@test.com",
			username: "test",
			password: "password",
			listings: allListings
		})

const user = await User.findOne({username: "test"})
console.log(user)
		console.log("all done!");
		process.exit(0);
	} catch (err) {
		throw err;
	}
});

