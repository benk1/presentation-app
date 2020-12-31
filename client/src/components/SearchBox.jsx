import React from 'react';

const SearchBox = ({ value, onChange }) => {
	return (
		<input
			type="text"
			name="query"
			className="form-control my-5"
			placeholder="Search by Presenter's name..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
};

export default SearchBox;
