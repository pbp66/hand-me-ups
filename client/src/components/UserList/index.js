import React from "react";
import { Link } from "react-router-dom";
const UserList = ({ users, title }) => {
	if (!users.length) {
		return <h3>No Users Yet</h3>;
	}

	return <div></div>;
};

export default UserList;
