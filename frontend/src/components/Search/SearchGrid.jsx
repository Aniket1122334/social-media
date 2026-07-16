import { useEffect } from "react";
import SearchGridItem from "./SearchGridItems";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SearchGrid = ({ data }) => {
  const navigate = useNavigate();

  const postSelector = useSelector((state) => state.posts.posts);

  // if postSelector is empty
  useEffect(() => {
    if (postSelector.length == 0) {
      navigate("/");
    }
  }, [postSelector, navigate]);

  // if search not happend show all photos
  let filteredPosts = postSelector;

  if (data.length > 0) {
    // ids after search
    const userIds = data.map((user) => user.id);

    // sarched ids posts
    filteredPosts = postSelector.filter((post) =>
      userIds.includes(post.user._id),
    );
  }

  return (
    <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4 mt-10">
      {filteredPosts.map((post) => (
        <SearchGridItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default SearchGrid;
