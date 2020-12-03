import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Header() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand" to="/presenters">
				Presentations
			</Link>

			<div className="collapse navbar-collapse" id="navbarNav ">
				<ul className="navbar-nav">
					<li className="nav-item ">
						<NavLink className="nav-link" to="/">
							Home
						</NavLink>
					</li>

					<li className="nav-item">
						<NavLink className="nav-link" to="/presentation/add">
							AddNewPresentantion
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/login">
							Login
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/login">
							Logout
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/signup">
							SignUp
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Header;
