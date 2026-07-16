import { FiSearch } from "react-icons/fi";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="relative mt-4">
      <FiSearch
        className="absolute left-5 top-1/2 -translate-y-1/2
        text-gray-400 text-xl"
      />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="
        w-full
        bg-zinc-900
        h-14
        rounded-xl
        pl-14
        pr-5
        outline-none
        border
        border-zinc-800
        focus:border-indigo-500
        transition
        "
      />
    </div>
  );
};

export default SearchBar;
