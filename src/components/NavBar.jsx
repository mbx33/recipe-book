import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './NavBar.css';

// components //
import SearchBar from './SearchBar';

function NavBar() {
	const { color } = useTheme();

	return (
		<div className="navbar" style={{ backgroundColor: color }}>
			<nav>
				<NavLink to="/" className="brand">
					<h1>Sveta's Cookbook</h1>
				</NavLink>
				<SearchBar />
				<NavLink to="/create">Create Recipe</NavLink>
			</nav>
		</div>
	);
}

export default NavBar;
