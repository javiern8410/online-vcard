import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

export interface SearchProps {
	query?: string;
}

const NavBar: FunctionComponent<SearchProps> = () => {
    return (
        <nav className="navbar">
            <div className="links-box">
                <div className="logo">
                    <Link to='/'>
                        <img src="static/images/logo-geci.png" height="60px" alt="GECI GROUP" />
                    </Link>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;
