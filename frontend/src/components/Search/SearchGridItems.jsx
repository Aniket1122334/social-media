import { FaPlay } from "react-icons/fa";

const SearchGridItem = ({ post }) => {
  return (
    <div className="relative overflow-hidden rounded-lg group cursor-pointer bg-black">
      {post.postType === "reel" ? (
        <video
          src={post.media}
          className="
            w-full
            aspect-square
            object-cover
            transition
            duration-500
            group-hover:scale-110
          "
          controls
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={post.media}
          alt="post"
          className="
            w-full
            aspect-square
            object-cover
            transition
            duration-500
            group-hover:scale-110
          "
        />
      )}

      {post.postType === "reel" && (
        <div className="absolute top-3 right-3 bg-black/60 p-2 rounded-full">
          <FaPlay className="text-white text-xs" />
        </div>
      )}
    </div>
  );
};

export default SearchGridItem;
