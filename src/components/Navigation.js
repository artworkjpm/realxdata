import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navigation = () => {
	return (
		<div>
			<nav className="main-nav">
				<ul>
					<li>
						<NavLink to="/mountain">Mountain</NavLink>
					</li>
					<li>
						<NavLink to="/beach">Beaches</NavLink>
					</li>
					<li>
						<NavLink to="/bird">Birds</NavLink>
					</li>
					<li>
						<NavLink to="/food">Food</NavLink>
					</li>
				</ul>
			</nav>

			<div className="about-me-nav">
				<div>
					<Link to="/">Home </Link> | <Link to="/about-this-app">About this app</Link>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
