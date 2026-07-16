import SearchBar from "../../components/Search/Searchbar";
import SearchHistory from "../../components/Search/SearchHistory";
import SearchGrid from "../../components/Search/SearchGrid";
import { useEffect, useState } from "react";
import { userSearch } from "../../services/profileService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query.trim()) {
        setSearchResult([]);
        return;
      }

      try {
        const response = await userSearch(query);
        setSearchResult(response);
      } catch (error) {
        console.error(error);
        setSearchResult([]);
      }
    };

    fetchUsers();
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white w-full">
      <div className="max-w-[90%] mx-auto px-4 md:px-8 py-6">
        <SearchBar query={query} setQuery={setQuery} />

        <SearchHistory data={searchResult} />

        <SearchGrid data={searchResult} />
      </div>
    </div>
  );
};

export default Search;
