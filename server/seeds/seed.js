import db from "../config/connection";
import { Category, User } from "../models";
import userSeeds from "./userSeeds.json" assert { type: "json" };

db.once("open", async () => {
	try {
		await User.deleteMany({});
		await Category.deleteMany();
		await User.create(userSeeds);
		await Category.insertMany([
			{ category: "Shirt" },
			{ category: "Hat" },
			{ category: "JNCOS" },
		]);

		console.log("all done!");
		process.exit(0);
	} catch (err) {
		throw err;
	}
});
