import React, { FunctionComponent, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './search-box.scss';

export interface SearchProps {
	query?: string;
}

const SearchBox: FunctionComponent<SearchProps> = ({ query }) => {

    const [inputValue, setInputValue] = useState(query || '');
    const history = useHistory();
    const searchInput = useRef(null);

    const handleInput = (event) => {
        const {value} = event.target;
        setInputValue(value);
    }

    const searchRedirect = (event) => {
        event.preventDefault();
        if(inputValue.length > 0) {
            history.push(`/items?search=${inputValue}`)
        } else {
            searchInput.current.focus();
        }
    }

    return (
        <nav className="navbar">
            <div className="search-box">
                <div className="logo">
                    <Link to='/'>
                        <img src="static/images/logo.png" height="60px" alt="ML Logo" />
                    </Link>
                </div>
                <div className="form-container">
                    <form className="search-form" onSubmit={searchRedirect}>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={inputValue} 
                            aria-label="Ingresa lo que quieras encontrar" 
                            name="search" 
                            placeholder="Buscar productos, marcas y más…" 
                            ref={searchInput} 
                            autoComplete="on"
                            maxLength="120" 
                            tabIndex="2"
                            onChange={handleInput}
                        />
                        <div aria-label="Buscar" className="search-btn" onClick={searchRedirect}></div>
                    </form>
                </div>
            </div>
        </nav>
    )
};

export default SearchBox;
