import { useEffect, useState } from "react";
import ProfileGrid from "../../components/Profile/ProfileGrid";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";

import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postSlice";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const userSelector = useSelector((state) => state.users.currentUser);
  const postSelector = useSelector(
    (state) => state.users?.currentUser?.posts || [],
  );

  return (
    <div className="min-h-screen bg-black text-white w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <ProfileHeader
          profileImg={userSelector?.profilePicture}
          fullname={userSelector?.fullname}
          username={userSelector?.username}
          posts={userSelector?.posts}
          followers={userSelector?.followers}
          following={userSelector?.following}
          bio={userSelector?.bio}
        />

        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <ProfileGrid activeTab={activeTab} userPosts={postSelector} />
      </div>
    </div>
  );
};

export default Profile;
