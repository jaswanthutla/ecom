import React, { createContext, useState } from 'react';

export const SearchContext = createContext(); // 

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');

    return (
        <SearchContext.Provider value={{ searchText, setSearchText }}>
            {children} {/*  Now it wraps all child components */}
        </SearchContext.Provider>
    );
};
