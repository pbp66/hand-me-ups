import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";
import styled from 'styled-components';
import { colors } from '../utils/constants';

const StyledLink = styled.a`
  background-color: ${colors.celeste};
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #B1F8F2;
  border-radius: 3px;
  display: block; 
  &:hover {
        background: ${colors.mindaro};
    };
`
const StyleHeader = styled.header`
  display: flex;
  align: center;
  background-color: ;
  
`
const StyledDiv = styled.div`
  display: flex-column;
  align: center;
  text: center;
  justify: space-between-lg;
  justify: center;
`


const Header = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<StyleHeader className="bg-info text-dark mb-4 py-3">
			<StyledDiv className="container">
				<StyledLink
					className="text-dark"
					to="/"
				>
					<h1
						className="m-0"
						style={{ fontSize: "3rem" }}
					>
						Tech Friends
					</h1>
				</StyledLink>
				<p
					className="m-0"
					style={{ fontSize: "1.75rem", fontWeight: "700" }}
				>
					Meet your new programming pals.
				</p>
				<div>
					{Auth.loggedIn() ? (
						<>
							<StyledLink
								className="btn btn-lg btn-primary m-2"
								to="/me"
							>
								View My User
							</StyledLink>
							<button
								className="btn btn-lg btn-light m-2"
								onClick={logout}
							>
								Logout
							</button>
						</>
					) : (
						<>
							<StyledLink
								className="btn btn-lg btn-primary m-2"
								to="/login"
							>
								Login
							</StyledLink>
							<StyledLink
								className="btn btn-lg btn-light m-2"
								to="/signup"
							>
								Signup
							</StyledLink>
						</>
					)}
				</div>
			</StyledDiv>
		</StyleHeader>
	);
};

export default Header;
