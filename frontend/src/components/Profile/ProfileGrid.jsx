import ProfilePostCard from "./ProfilePostCards";

const ProfileGrid = ({ activeTab, userPosts, setSelectedPost }) => {
  const filteredPosts =
    activeTab === "posts"
      ? userPosts.filter((post) => post.postType === "post")
      : activeTab === "reels"
        ? userPosts.filter((post) => post.postType === "reel")
        : [];

  if (!filteredPosts.length) {
    return (
      <div className="flex items-center justify-center h-72">
        <h2 className="text-2xl font-semibold text-gray-400">
          {activeTab === "posts"
            ? "No Posts"
            : activeTab === "reels"
              ? "No Reels"
              : "No Tagged User"}
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
      {filteredPosts.map((post) => (
        <ProfilePostCard
          key={post._id}
          post={post}
          onClick={() => setSelectedPost(post)}
        />
      ))}
    </div>
  );
};

export default ProfileGrid;
