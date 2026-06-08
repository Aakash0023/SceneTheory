import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Searching:", query);

    if (!query.trim()) return;

    onSearch(query);
  };

  return (
    <form className="navbar-search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
