import React, { FunctionComponent, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

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
        <div className="searchbox">
            <div className="form-container">
                <form className="search-form" onSubmit={searchRedirect}>
                    <Input 
                        icon='search' 
                        className="search-input" 
                        name="search" 
                        aria-label="Enter a employee name" 
                        autoComplete="on" 
                        placeholder='Search employee...' 
                        onChange={handleInput} 
                    />
                </form>
            </div>
        </div>
    )
};

export default SearchBox;
