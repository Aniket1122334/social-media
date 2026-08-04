import { FaHeart, FaComment, FaPlay } from "react-icons/fa";
import { useRef } from "react";

const ProfilePostCard = ({ post, onClick }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (post.postType === "reel") {
      videoRef.current?.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (post.postType === "reel") {
      videoRef.current?.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer overflow-hidden rounded-md bg-black select-none"
    >
      {/* Media */}

      {post.postType === "reel" ? (
        <video
          ref={videoRef}
          src={post.media}
          muted
          playsInline
          loop
          preload="metadata"
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <img
          src={post.media}
          alt="post"
          loading="lazy"
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}

      {/* Reel Badge */}

      {post.postType === "reel" && (
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded-full">
          <FaPlay className="text-white text-xs" />
        </div>
      )}

      {/* Hover Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-black/55
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
          hidden
          md:flex
          items-center
          justify-center
          gap-10
          pointer-events-none
        "
      >
        <div className="flex items-center gap-2 text-white font-semibold text-lg">
          <FaHeart className="text-xl" />
          <span>{post.likes?.length || 0}</span>
        </div>

        <div className="flex items-center gap-2 text-white font-semibold text-lg">
          <FaComment className="text-xl" />
          <span>{post.comments?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;
