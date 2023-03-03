import express from "express";
import { ApolloServer } from "@apollo/server";
// import { addMocksToSchema } from '@graphql-tools/mock'
// import { makeExecutableSchema} from '@graphql-tools/schema'
import { expressMiddleware } from "@apollo/server/express4";
import db from "./config/connection";
import { typeDefs, resolvers } from "./schemas";
import { authMiddleware } from "./utils/auth";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
	// schema: addMocksToSchema({
	// 	schema: makeExecutableSchema({typeDefs, resolvers})
	// })
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
	// app.use(
	// 	express.static(new URL("../client/build", import.meta.url).pathname)
	// );
	app.use(
		express.static(new URL(".dist/client/build", import.meta.url).pathname)
	);
}

app.get("/", (req, res) => {
	// res.sendFile(
	// 	new URL("../client/build/index.html", import.meta.url).pathname
	// );
	res.sendFile(
		new URL("./dist/client/build/index.html", import.meta.url).pathname
	);
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
	db.once("open", async () => {
		await server.start();
		app.use(
			"/graphql",
			expressMiddleware(server, {
				context: authMiddleware, // Runs all graphql req's through authMiddleware
			})
		);

		app.listen(PORT, () => {
			console.log(
				`🌍 API server running Now Listening on http://localhost:${PORT}`
			);
			console.log(`Use GraphQL at http://localhost:${PORT}${"/graphql"}`);
		});
	});
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
