import db from "../config/connection";
import { User } from "../models";
import userSeeds from "./userSeeds.json" assert { type: "json" };

db.once("open", async () => {
	try {
		await User.deleteMany({});
		await User.create(userSeeds);

		console.log("all done!");
		process.exit(0);
	} catch (err) {
		throw err;
	}
});
