import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar"
// import image from "../../assets/retro-header.png"

import Auth from "../../utils/auth";

const Header = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<Navbar />

	);
};

export default Header;
