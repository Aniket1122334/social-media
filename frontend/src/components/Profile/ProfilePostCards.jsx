import { FaHeart, FaComment } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const ProfilePostCard = ({ post }) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-lg bg-black">
      {/* Media */}

      {post.postType === "reel" ? (
        <video
          src={post.media}
          className="w-full aspect-square object-cover transition duration-500 group-hover:scale-110"
          muted
          playsInline
        />
      ) : (
        <img
          src={post.media}
          alt="post"
          className="w-full aspect-square object-cover transition duration-500 group-hover:scale-110"
        />
      )}

      {/* Reel Badge */}

      {post.postType === "reel" && (
        <div className="absolute top-3 right-3 bg-black/60 p-2 rounded-full">
          <FaPlay className="text-white text-xs" />
        </div>
      )}

      {/* Overlay */}

      <div
        className="
        absolute
        inset-0
        bg-black/60
        opacity-0
        group-hover:opacity-100
        transition
        duration-300
        hidden
        md:flex
        items-center
        justify-center
        gap-8
        "
      >
        <div className="flex items-center gap-2 text-white font-semibold">
          <FaHeart />
          {post.likes.length}
        </div>

        <div className="flex items-center gap-2 text-white font-semibold">
          <FaComment />
          {post.comments.length}
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;
