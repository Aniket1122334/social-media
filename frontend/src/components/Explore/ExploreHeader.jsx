import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setQuery } from "../../redux/slices/externalApiSlice";

const ExploreHeader = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold">Explore</h1>

      <p className="text-gray-400 mt-2">Discover photos, reels and creators.</p>

      <div className="relative mt-6">
        <FiSearch
          className="absolute left-4 top-1/2
          -translate-y-1/2 text-gray-400 text-xl"
        />

        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search..."
          className="
          w-full
          h-12
          bg-zinc-900
          border
          border-zinc-800
          rounded-xl
          pl-12
          pr-4
          outline-none
          focus:border-violet-500
          "
        />
      </div>
    </div>
  );
};

export default ExploreHeader;
