import { useEffect, useState } from "react";
import Stories from "../../components/Home/Stories";
import PostCard from "../../components/Home/PostCard";
import RightSidebar from "../../components/Home/RightSidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice";
import Comments from "../../components/Comments/Comments";

const Home = () => {
  const [isMobile, setSidebarOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const currentUserId = useSelector((state) => state.auth?.user?.id);
  // console.log(currentUserId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const postSelector = useSelector((state) => state.posts.posts);
  // console.log(postSelector);

  return (
    <div className="flex space-between bg-black">
      <div className="post-section min-h-screen bg-black px-10 py-2">
        {/* stories */}
        <div className="stories py-5">
          <Stories />
        </div>

        {/* Posts */}
        <div className="min-h-screen  px-20">
          {postSelector?.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUserId={currentUserId}
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
            />
          ))}
        </div>
      </div>

      {/* suggestions */}

      {isMobile ? null : (
        <div className="right-sidebar">
          <RightSidebar />
        </div>
      )}

      {selectedPostId && (
        <Comments
          postId={selectedPostId}
          setSelectedPostId={setSelectedPostId}
        />
      )}
    </div>
  );
};

export default Home;
