import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

// set token secret and expiration date
const secret = process.env.AUTH_SECRET;
const expiration = "2h";

export function signToken({ email, name, _id }) {
	const payload = { email, name, _id };
	return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

// function for our authenticated routes
export function authMiddleware({ req, res }) {
	// allows token to be sent via req.body, req.query, or headers
	let token = req.body.token || req.query.token || req.headers.authorization;

	// We split the token string into an array and return actual token
	if (req.headers.authorization) {
		token = token.split(" ").pop().trim();
	}

	if (!token) {
		return req; // Return request unmodified
	}

	// if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
	try {
		const { data } = jwt.verify(token, secret, { maxAge: expiration });
		req.user = data;

		// return the request object so it can be passed to the resolver as `context`
		return req;
	} catch (err) {
		console.error("Invalid token", err);
	}
}
