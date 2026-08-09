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

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        group
        relative

        w-full
        aspect-square

        overflow-hidden

        bg-zinc-900

        cursor-pointer

        rounded-none

        sm:rounded-sm
      "
    >
      {/* =====================================================
          MEDIA
      ====================================================== */}

      {post.postType === "reel" ? (
        <video
          ref={videoRef}
          src={post.media}
          muted
          playsInline
          loop
          preload="metadata"
          className="
            block

            w-full
            h-full

            object-cover

            transition-transform
            duration-500

            md:group-hover:scale-110
          "
        />
      ) : (
        <img
          src={post.media}
          alt="post"
          loading="lazy"
          className="
            block

            w-full
            h-full

            object-cover

            transition-transform
            duration-500

            md:group-hover:scale-110
          "
        />
      )}

      {/* =====================================================
          REEL BADGE
      ====================================================== */}

      {post.postType === "reel" && (
        <div
          className="
            absolute
            top-2
            right-2

            sm:top-3
            sm:right-3

            bg-black/60
            backdrop-blur-sm

            p-1.5
            sm:p-2

            rounded-full

            z-10
          "
        >
          <FaPlay
            className="
              text-white
              text-[9px]
              sm:text-xs
            "
          />
        </div>
      )}

      {/* =====================================================
          HOVER OVERLAY - DESKTOP
      ====================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-black/55

          opacity-0

          md:flex

          hidden

          items-center
          justify-center

          gap-6
          lg:gap-10

          pointer-events-none

          transition-opacity
          duration-300

          md:group-hover:opacity-100
        "
      >
        {/* Likes */}

        <div
          className="
            flex
            items-center
            gap-2

            text-white
            font-semibold

            text-sm
            lg:text-lg
          "
        >
          <FaHeart className="text-base lg:text-xl" />

          <span>{post.likes?.length || 0}</span>
        </div>

        {/* Comments */}

        <div
          className="
            flex
            items-center
            gap-2

            text-white
            font-semibold

            text-sm
            lg:text-lg
          "
        >
          <FaComment className="text-base lg:text-xl" />

          <span>{post.comments?.length || 0}</span>
        </div>
      </div>

      {/* =====================================================
          MOBILE REEL INDICATOR
      ====================================================== */}

      {post.postType === "reel" && (
        <div
          className="
            md:hidden

            absolute
            bottom-2
            left-2

            flex
            items-center
            gap-1

            bg-black/60
            backdrop-blur-sm

            px-2
            py-1

            rounded-md

            text-white

            text-[10px]
          "
        >
          <FaPlay size={8} />

          <span>Reel</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePostCard;
