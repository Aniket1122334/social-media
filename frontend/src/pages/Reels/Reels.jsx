import { useEffect } from "react";
import ReelCard from "../../components/Reels/ReelCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Reels = () => {
  const navigate = useNavigate();
  const postSelector = useSelector((state) => state.posts.posts);
  // console.log(postSelector);

  useEffect(() => {
    if (postSelector.length === 0) {
      navigate("/");
    }
  }, [postSelector, navigate]);
  return (
    <div className="bg-black w-full min-h-screen flex justify-center">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        {postSelector
          .filter((item) => item.postType === "reel")
          .map((item) => (
            <ReelCard key={item.id} reel={item} />
          ))}
      </div>
    </div>
  );
};

export default Reels;
