import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toggleLiked } from "../../redux/slices/postSlice";

const PostCard = ({ post, currentUserId, setSelectedPostId }) => {
  const dispatch = useDispatch();

  // console.log(openComment);

  // check if current user liked this post
  const isLiked = post?.likes?.some((id) => id.toString() === currentUserId);

  const handleLike = () => {
    dispatch(toggleLiked(post._id));
  };

  const formatTime = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="w-full bg-[#181818] rounded-3xl border border-zinc-800 overflow-hidden my-4">
      {/* Header */}

      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={
              post?.user?.profilePicture ||
              "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
            }
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="text-white font-semibold">
              {post?.user?.username || "Unknown User"}
            </h3>

            <p className="text-gray-400 text-sm">
              {post?.user?.fullname || ""}
            </p>
          </div>
        </div>

        <HiOutlineDotsHorizontal className="text-white text-2xl cursor-pointer" />
      </div>

      {/* Post and reel*/}

      <div className="w-full bg-black flex justify-center items-center">
        {post?.postType === "reel" ? (
          <video
            src={post?.media}
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-h-175 object-cover"
          />
        ) : (
          <img
            src={post?.media}
            alt="post"
            className="w-full max-h-175 object-contain"
          />
        )}
      </div>

      {/* Actions */}

      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-6">
          {isLiked ? (
            <FaHeart
              className="text-red-500 text-2xl cursor-pointer transition"
              onClick={handleLike}
            />
          ) : (
            <FaRegHeart
              className="text-white text-2xl cursor-pointer hover:text-red-500 transition"
              onClick={handleLike}
            />
          )}

          <FaRegComment
            onClick={() => setSelectedPostId(post._id)}
            className="text-white text-2xl cursor-pointer hover:text-gray-300 transition"
          />

          <FiSend className="text-white text-2xl cursor-pointer hover:text-gray-300 transition" />
        </div>

        <BsBookmark className="text-white text-2xl cursor-pointer hover:text-yellow-400 transition" />
      </div>

      {/* Likes */}

      <div className="px-5">
        <p className="text-white font-semibold">
          {post?.likes?.length || 0} likes
        </p>
      </div>

      {/* Caption */}

      <div className="px-5 pt-3">
        <p className="text-gray-200 wrap-break-word leading-7">
          <span className="font-semibold text-white mr-2">
            {post?.user?.username || "Unknown"}
          </span>

          {post?.caption}
        </p>
      </div>

      {/* Comments */}

      <button
        onClick={() => setSelectedPostId(post._id)}
        className="pl-5 text-gray-400 hover:text-white transition cursor-pointer"
      >
        View all {post?.comments?.length || 0} comments
      </button>

      {/* Time */}

      <div className="px-5 py-4">
        <p className="text-gray-500 text-sm">{formatTime(post?.createdAt)}</p>
      </div>
    </div>
  );
};

export default PostCard;
