const SearchHistory = ({ data }) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>

      <div className="mt-5 space-y-4">
        {data.map((user) => (
          <div key={user.id} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-700">
                <img
                  className="w-full h-full rounded-4xl bg-cover"
                  src={
                    user.profilePicture ||
                    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                  }
                />
              </div>

              <div>
                <h3>{user.fullname}</h3>

                <p className="text-gray-500 text-sm">Suggested for you</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
