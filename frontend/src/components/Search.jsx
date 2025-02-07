import React, { useState } from 'react';

function Search({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className='search'>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;