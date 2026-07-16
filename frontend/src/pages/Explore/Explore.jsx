import ExploreHeader from "../../components/Explore/ExploreHeader";
import ExploreGrid from "../../components/Explore/ExploreGrid";

const Explore = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="max-w-[90%] mx-auto px-3 sm:px-5 lg:px-8 py-6">
        <ExploreHeader />

        <ExploreGrid />
      </div>
    </div>
  );
};

export default Explore;
