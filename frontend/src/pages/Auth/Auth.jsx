const Auth = ({ children, authVideo }) => {
  return (
    <div className="w-full">
      <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
        <div
          className="
          w-full
          min-h-[95vh]
          bg-[#181818]
          rounded-3xl
          overflow-hidden
          shadow-2xl
          grid
          grid-cols-1
          lg:grid-cols-2
        "
        >
          {/* Left Section */}
          <div className="flex items-center justify-center px-6 py-10 md:px-12 lg:px-16">
            {children}
          </div>

          {/* Right Section */}
          <div className="hidden lg:block relative overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={authVideo} type="video/mp4" />
            </video>

            {/* Optional Dark Overlay */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
