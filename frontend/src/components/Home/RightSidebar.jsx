import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";
import { follow, unfollow } from "../../redux/slices/followSlice";
import { toast } from "react-toastify";

const RightSidebar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const allUsersSelector = useSelector((state) => state.users.allUsers);
  // console.log(allUsersSelector);
  const currentUser = useSelector((state) => state.users.currentUser);

  const isFollowing = (userId) => {
    return currentUser?.following?.includes(userId);
  };

  const handleFollow = (user) => {
    if (isFollowing(user._id)) {
      dispatch(unfollow(user._id));

      toast.success(`You unfollowed ${user.username}`);
    } else {
      dispatch(follow(user._id));

      toast.success(`You followed ${user.username}`);
    }
  };

  return (
    <div className="h-screen sticky top-0 px-6 py-8">
      {/* Current User */}

      <Link to="/profile">
        <div className="flex items-center justify-center pb-4 cursor-pointer">
          <div className="flex items-center gap-4">
            <img
              src={
                currentUser?.profilePicture ||
                "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              }
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <h3 className="text-white font-semibold">
                {currentUser?.username}
              </h3>

              <p className="text-sm text-gray-400">{currentUser?.fullName}</p>
            </div>
          </div>
        </div>
      </Link>
      {/* Suggested */}

      <div className="flex justify-between items-center mt-10 mb-6">
        <h3 className="text-gray-400 font-semibold">Suggested for you</h3>

        <button className="text-white text-sm hover:text-gray-300">
          See All
        </button>
      </div>

      {/* Users */}

      <div className="space-y-5">
        {allUsersSelector?.map((user) => (
          <div key={user._id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={
                  user.profilePicture ||
                  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                }
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h4 className="text-white text-sm font-medium">
                  {user.username}
                </h4>

                <p className="text-xs text-gray-500">{user.fullName}</p>
              </div>
            </div>

            <button
              onClick={() => handleFollow(user)}
              className={`text-sm font-semibold transition
    ${
      isFollowing(user._id)
        ? "text-gray-400 hover:text-gray-300"
        : "text-violet-400 hover:text-violet-300"
    }`}
            >
              {isFollowing(user._id) ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="mt-14 text-xs text-gray-600 leading-6">
        About • Help • Press • API • Jobs • Privacy • Terms • Locations •
        Language
        <p className="mt-5">© 2026 Instagram Clone</p>
      </div>
    </div>
  );
};

export default RightSidebar;
