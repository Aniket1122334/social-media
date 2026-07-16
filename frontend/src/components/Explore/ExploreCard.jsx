import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";

const ExploreCard = ({ image }) => {
  return (
    <div
      className="
      relative
      aspect-square
      overflow-hidden
      rounded-xl
      cursor-pointer
      group
      "
    >
      <img
        src={image}
        alt=""
        className="
        w-full
        h-full
        object-cover
        group-hover:scale-110
        transition
        duration-500
        "
      />

      <div
        className="
        absolute
        inset-0
        bg-black/50
        opacity-0
        group-hover:opacity-100
        transition
        flex
        items-center
        justify-center
        gap-8
        "
      >
        <div className="flex items-center gap-2">
          <FaHeart />
          <span>324</span>
        </div>

        <div className="flex items-center gap-2">
          <FaComment />
          <span>18</span>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
