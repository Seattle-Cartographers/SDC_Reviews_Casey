import React from 'react';
import { func, string } from 'prop-types';

const Search = ({ handleChange, search }) => {
  if (search === 'All reviews') {
    search = '';
  }
  return (
    <div className="search">
      Search
      <input type="text" onChange={handleChange} value={search} placeholder="Search reviews" />
    </div>
  );
};

Search.propTypes = {
  handleChange: func.isRequired,
  search: string.isRequired,
}

export default Search;

