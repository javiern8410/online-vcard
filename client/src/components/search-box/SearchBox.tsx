import React, { FunctionComponent } from 'react';
import { Input } from 'semantic-ui-react';

import './search-box.scss';

export interface SearchProps {
    searchWord: string;
	setSearchWord: Function;
}

const SearchBox: FunctionComponent<SearchProps> = ({ searchWord, setSearchWord }) => {

    const handleInput = (event) => {
        const {value} = event.target;
        setSearchWord(value);
    }

    return (
        <div className="searchbox">
            <Input 
                icon='search' 
                className="search-input" 
                name="search" 
                value={searchWord}
                aria-label="Enter a employee name" 
                autoComplete="on" 
                placeholder='Search employee by name or email handler...' 
                onChange={handleInput} 
            />
        </div>
    )
};

export default SearchBox;
