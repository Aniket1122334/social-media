import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ExploreCard from "./ExploreCard";
import { fetchAllPhotos } from "../../redux/slices/externalApiSlice";

const ExploreGrid = () => {
  const { results, query, loading, error } = useSelector(
    (state) => state.externalPhotos,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPhotos(query || "all"));
  }, [dispatch, query]);

  if (loading) {
    return <h2 className="text-center text-white">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-500">{error}</h2>;
  }

  return (
    <div
      className="
      grid
      grid-cols-2
      sm:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-2
      md:gap-4
      "
    >
      {results.map((photo) => (
        <ExploreCard
          key={photo.id}
          image={photo.thumbnail}
          title={photo.title}
        />
      ))}
    </div>
  );
};

export default ExploreGrid;
