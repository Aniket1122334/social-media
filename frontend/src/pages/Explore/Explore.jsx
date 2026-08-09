import ExploreHeader from "../../components/Explore/ExploreHeader";
import ExploreGrid from "../../components/Explore/ExploreGrid";

const Explore = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="
          ml-20
          min-h-screen
          px-4
          sm:px-6
          md:px-8
          lg:px-0
          py-6
        "
      >
        <div
          className="
            mx-auto
            w-full
            lg:w-[70vw]
            min-h-screen
          "
        >
          {/* =================================================
              EXPLORE HEADER
          ================================================= */}

          <div className="w-full mb-6">
            <ExploreHeader />
          </div>

          {/* =================================================
              EXPLORE GRID
          ================================================= */}

          <div className="w-full">
            <ExploreGrid />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explore;
