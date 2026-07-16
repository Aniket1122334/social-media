const stories = [
  {
    id: 1,
    username: "your_story",
    image: "https://i.pravatar.cc/150?img=1",
    own: true,
  },

  {
    id: 1,
    username: "your_story",
    image: "https://i.pravatar.cc/150?img=1",
    own: true,
  },

  {
    id: 1,
    username: "your_story",
    image: "https://i.pravatar.cc/150?img=1",
    own: true,
  },

  {
    id: 1,
    username: "your_story",
    image: "https://i.pravatar.cc/150?img=1",
    own: true,
  },

  {
    id: 1,
    username: "your_story",
    image: "https://i.pravatar.cc/150?img=1",
    own: true,
  },

  {
    id: 1,
    username: "your_story",
    image: "https://i.pravatar.cc/150?img=1",
    own: true,
  },
  {
    id: 2,
    username: "rohit",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    username: "priya",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    username: "rahul",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    username: "neha",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    username: "aman",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    username: "simran",
    image: "https://i.pravatar.cc/150?img=7",
  },
];

const Stories = () => {
  return (
    <div className="w-full bg-[#181818] rounded-2xl border border-zinc-800 px-4 py-5 overflow-x-auto scrollbar-hide">
      <div className="flex gap-5 min-w-max">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer"
          >
            <div
              className={`p-0.75 rounded-full ${
                story.own
                  ? "bg-zinc-600"
                  : "bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600"
              }`}
            >
              <img
                src={story.image}
                alt={story.username}
                className="w-18 h-18 rounded-full border-2 border-[#181818] object-cover"
              />
            </div>

            <p className="text-white text-xs mt-2 max-w-17.5 truncate">
              {story.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
