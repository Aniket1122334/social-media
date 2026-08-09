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
    <div className="min-h-screen bg-black text-white">
      {/* =====================================================
          MAIN SEARCH CONTENT
      ====================================================== */}

      <main
        className="
          ml-20
          min-h-screen
          px-4
          sm:px-6
          md:px-8
          lg:px-0
          py-6
        "
      >
        <div
          className="
            mx-auto
            w-full
            lg:w-[70vw]
            min-h-screen
          "
        >
          {/* =================================================
              SEARCH BAR
          ================================================= */}

          <div
            className="
              w-full
              max-w-2xl
              mx-auto
              mb-8
            "
          >
            <SearchBar query={query} setQuery={setQuery} />
          </div>

          {/* =================================================
              SEARCH HISTORY / RESULTS
          ================================================= */}

          <div className="w-full">
            <SearchHistory data={searchResult} />
          </div>

          {/* =================================================
              SEARCH GRID
          ================================================= */}

          <div className="w-full mt-6">
            <SearchGrid data={searchResult} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
