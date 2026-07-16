const UserInfo = () => {
  return (
    <div className="h-screen bg-[#111] border-l border-zinc-800 p-6 text-white">
      <div className="flex flex-col items-center">
        <img
          src="https://i.pravatar.cc/200?img=1"
          alt=""
          className="w-28 h-28 rounded-full"
        />

        <h2 className="mt-5 text-xl font-semibold">Rahul Sharma</h2>

        <p className="text-zinc-400">@rahul_sharma</p>
      </div>

      {/* About */}

      <div className="mt-10">
        <h3 className="font-semibold mb-3">About</h3>

        <p className="text-zinc-400 text-sm leading-6">
          MERN Stack Developer 🚀
          <br />
          Loves Coffee ☕
          <br />
          React ❤️ Node.js
        </p>
      </div>

      {/* Shared Media */}

      <div className="mt-10">
        <h3 className="font-semibold mb-4">Shared Media</h3>

        <div className="grid grid-cols-3 gap-3">
          <img
            src="https://picsum.photos/200?1"
            className="rounded-lg"
            alt=""
          />

          <img
            src="https://picsum.photos/200?2"
            className="rounded-lg"
            alt=""
          />

          <img
            src="https://picsum.photos/200?3"
            className="rounded-lg"
            alt=""
          />

          <img
            src="https://picsum.photos/200?4"
            className="rounded-lg"
            alt=""
          />

          <img
            src="https://picsum.photos/200?5"
            className="rounded-lg"
            alt=""
          />

          <img
            src="https://picsum.photos/200?6"
            className="rounded-lg"
            alt=""
          />
        </div>
      </div>

      {/* Buttons */}

      <div className="mt-10 space-y-3">
        <button className="w-full bg-violet-600 py-3 rounded-xl">
          View Profile
        </button>

        <button className="w-full bg-zinc-800 py-3 rounded-xl hover:bg-zinc-700 transition">
          Block User
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
