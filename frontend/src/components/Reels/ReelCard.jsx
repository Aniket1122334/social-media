import ReelInfo from "./ReelInfo";

const ReelCard = ({ reel }) => {
  return (
    <div className="relative h-screen snap-start rounded-4xl  m-10 bg-red-400">
      {/* Video */}

      <video
        className="w-full h-full object-cover rounded-4xl"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={reel.media} />
      </video>

      {/* User Info */}

      <div className="absolute bottom-8 left-4">
        <ReelInfo />
      </div>
    </div>
  );
};

export default ReelCard;
