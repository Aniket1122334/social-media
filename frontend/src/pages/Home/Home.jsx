import { useEffect, useState } from "react";
import PostCard from "../../components/Home/PostCard";
import RightSidebar from "../../components/Home/RightSidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice";
import Comments from "../../components/Comments/Comments";

const Home = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.auth?.user?.id);

  const postSelector = useSelector((state) => state.posts.posts) || [];

  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full text-white">
      {/* MAIN CONTENT */}

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
            lg:w-[80vw]
            flex
            gap-8
            justify-center
          "
        >
          {/* FEED */}

          <section
            className="
              w-full
              max-w-[40vw]
              min-w-65
            "
          >
            {/* Feed */}

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="
                      h-112.5
                      rounded-xl
                      bg-zinc-900
                      animate-pulse
                    "
                  />
                ))}
              </div>
            ) : postSelector.length > 0 ? (
              <div className="space-y-6">
                {postSelector.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    currentUserId={currentUserId}
                    setSelectedPostId={setSelectedPostId}
                  />
                ))}
              </div>
            ) : (
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  min-h-100
                  text-center
                "
              >
                <h2 className="text-xl font-semibold">No posts yet</h2>

                <p className="text-zinc-500 mt-2">
                  Follow people to see their posts here.
                </p>
              </div>
            )}
          </section>

          {/* RIGHT SIDEBAR */}

          <aside
            className="
              hidden
              xl:block
              w-[320px]
              shrink-0
            "
          >
            <div className="sticky top-6">
              <RightSidebar />
            </div>
          </aside>
        </div>
      </main>

      {/* COMMENTS MODAL */}

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
