import { Link } from "react-router-dom";

const ProfileHeader = ({
  profileImg,
  fullname,
  username,
  posts,
  followers,
  following,
  bio,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-zinc-800 pb-10">
      {/* Avatar */}

      <div className="flex justify-center">
        <img
          src={
            profileImg
              ? profileImg
              : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          }
          alt="Profile"
          className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-zinc-700"
        />
      </div>

      {/* Right Section */}

      <div className="flex-1 w-full text-center md:text-left">
        {/* Username + Buttons */}

        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <h1 className="text-3xl font-semibold">{fullname}</h1>

          <div className="flex justify-center md:justify-start gap-3 flex-wrap">
            <Link to="/edit">
              <button
                className="bg-white text-black px-5 py-2 rounded-lg
              font-medium hover:bg-gray-200 transition"
              >
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        {/* Stats */}

        <div className="flex justify-center md:justify-start gap-8 mt-8">
          <div className="text-center">
            <h2 className="text-xl font-bold">{posts?.length || 0}</h2>
            <p className="text-gray-400">Posts</p>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold">{followers?.length || 0}</h2>
            <p className="text-gray-400">Followers</p>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold">{following?.length || 0}</h2>
            <p className="text-gray-400">Following</p>
          </div>
        </div>

        {/* Name */}

        <h2 className="mt-8 text-xl font-semibold">@{username}</h2>

        {/* Bio */}

        <p className="text-gray-400 mt-3 max-w-xl leading-7">{bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
