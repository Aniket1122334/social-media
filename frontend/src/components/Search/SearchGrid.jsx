import { useEffect } from "react";
import SearchGridItem from "./SearchGridItems";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchGrid = ({ data = [] }) => {
  const navigate = useNavigate();

  const postSelector = useSelector((state) => state?.posts?.posts || []);

  // If posts are empty
  useEffect(() => {
    if (postSelector.length === 0) {
      navigate("/");
    }
  }, [postSelector, navigate]);

  // Initially show all posts
  let filteredPosts = postSelector;

  // If search is performed
  if (data.length > 0) {
    // Get searched user IDs
    const userIds = data.map((user) => user.id);

    // Filter posts according to searched users
    filteredPosts = postSelector.filter((post) =>
      userIds.includes(post.user._id),
    );
  }

  return (
    <div className="w-full">
      {filteredPosts.length > 0 ? (
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-1
            sm:gap-2
            w-full
          "
        >
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="
                aspect-square
                overflow-hidden
                bg-zinc-900
              "
            >
              <SearchGridItem post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-zinc-500 text-sm sm:text-base">No posts found</p>
        </div>
      )}
    </div>
  );
};

export default SearchGrid;
