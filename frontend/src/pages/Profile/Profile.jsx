import { useEffect, useState } from "react";
import ProfileGrid from "../../components/Profile/ProfileGrid";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import PostModal from "../../components/PostModal/PostModal";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice";
import { fetchComments } from "../../redux/slices/commentSlice";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedPost, setSelectedPost] = useState(null);

  const dispatch = useDispatch();

  // Sirf ek baar posts fetch karo
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Modal open hone par comments fetch karo
  useEffect(() => {
    if (selectedPost?._id) {
      dispatch(fetchComments(selectedPost._id));
    }
  }, [dispatch, selectedPost]);

  const userSelector = useSelector((state) => state.users.currentUser);

  const postSelector = useSelector(
    (state) => state.users?.currentUser?.posts || [],
  );

  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="
          ml-20

          min-h-screen
          w-[calc(100vw-5rem)]

          px-3
          sm:px-5
          md:px-8
          lg:px-0

          py-5
          sm:py-6
          md:py-8

          overflow-x-hidden
        "
      >
        {/* =====================================================
            PROFILE CONTAINER
        ====================================================== */}

        <div
          className="
            mx-auto
            w-full

            lg:w-[80vw]

            max-w-350

            min-h-screen
          "
        >
          {/* =================================================
              PROFILE HEADER
          ================================================= */}

          <div
            className="
              w-full
              overflow-hidden
            "
          >
            <ProfileHeader
              profileImg={userSelector?.profilePicture}
              fullname={userSelector?.fullname}
              username={userSelector?.username}
              posts={userSelector?.posts}
              followers={userSelector?.followers}
              following={userSelector?.following}
              bio={userSelector?.bio}
            />
          </div>

          {/* =================================================
              PROFILE TABS
          ================================================= */}

          <div
            className="
              w-full
              mt-5
              sm:mt-6
              md:mt-8

              overflow-x-auto
              scrollbar-hide
            "
          >
            <div className="min-w-max">
              <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>

          {/* =================================================
              PROFILE GRID
          ================================================= */}

          <div
            className="
              w-full
              mt-5
              sm:mt-6
              md:mt-8
            "
          >
            <ProfileGrid
              activeTab={activeTab}
              userPosts={postSelector}
              setSelectedPost={setSelectedPost}
            />
          </div>
        </div>
      </main>

      {/* =====================================================
          POST MODAL
      ====================================================== */}

      {selectedPost && (
        <PostModal
          user={userSelector}
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default Profile;
