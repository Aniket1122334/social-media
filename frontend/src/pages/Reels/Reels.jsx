import { useEffect } from "react";
import ReelCard from "../../components/Reels/ReelCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Reels = () => {
  const navigate = useNavigate();

  const postSelector = useSelector((state) => state.posts.posts || []);

  useEffect(() => {
    if (postSelector.length === 0) {
      navigate("/");
    }
  }, [postSelector, navigate]);

  const reels = postSelector.filter((item) => item.postType === "reel");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="
          ml-15
          min-h-screen
          px-2
          sm:px-4
          md:px-6
          py-4
        "
      >
        {/* =================================================
            REELS CONTAINER
        ================================================= */}

        <div
          className="
            w-[85vw]
            max-w-95
            sm:max-w-105
            md:max-w-115
            lg:max-w-155
          "
        >
          {reels.length > 0 ? (
            <div className="space-y-6">
              {reels.map((item) => (
                <ReelCard key={item._id} reel={item} />
              ))}
            </div>
          ) : (
            <div
              className="
                min-h-[80vh]
                flex
                items-center
                justify-center
                text-center
              "
            >
              <div>
                <h2 className="text-xl font-semibold">No Reels Found</h2>

                <p className="mt-2 text-zinc-500">
                  There are no reels available right now.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reels;
