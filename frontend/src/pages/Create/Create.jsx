import { ImagePlus, Upload } from "lucide-react";

import { useDispatch } from "react-redux";
import { createNewPost } from "../../redux/slices/postSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    caption: "",
    media: null,
    postType: "post",
    // tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const MAX_REEL_SIZE = 50 * 1024 * 1024; // 50 MB

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check if file is video
    if (file.type.startsWith("video")) {
      if (file.size > MAX_REEL_SIZE) {
        alert("Reel size must be less than or equal to 50 MB.");

        // Input reset
        e.target.value = "";

        return;
      }

      setData((prev) => ({
        ...prev,
        media: file,
        postType: "reel",
      }));
    }

    // Check if file is image
    else if (file.type.startsWith("image")) {
      setData((prev) => ({
        ...prev,
        media: file,
        postType: "post",
      }));
    }

    // Invalid file
    else {
      alert("Only images and videos are allowed.");
      e.target.value = "";
    }
  };

  const handleCreateForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("caption", data.caption);
    formData.append("media", data.media);
    formData.append("postType", data.postType);

    const result = await dispatch(createNewPost(formData));

    alert(result.payload.message);

    navigate("/");
  };
  return (
    <div className="min-h-screen w-full bg-[#181818] text-white px-4 py-6">
      <form onSubmit={handleCreateForm} className="max-w-5xl mx-auto">
        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Create New Post</h1>

          <p className="text-zinc-400 mt-2">
            Share your favorite moments with your followers.
          </p>
        </div>

        {/* Main Container */}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}

          <div className="bg-[#222] rounded-3xl p-6">
            <label
              htmlFor="media"
              className="border-2 border-dashed border-zinc-600 rounded-3xl h-105
    flex flex-col items-center justify-center cursor-pointer
    hover:border-violet-500 transition overflow-hidden"
            >
              {!data.media ? (
                <>
                  <ImagePlus size={70} className="text-violet-500" />

                  <h2 className="text-xl font-semibold mt-6">
                    Upload Image / Reel
                  </h2>

                  <p className="text-zinc-400 mt-2 text-center">
                    Drag & Drop your media here
                    <br />
                    or click to browse
                  </p>

                  <p className="text-xs text-zinc-500 mt-3 text-center">
                    JPG • PNG • WEBP • MP4
                    <br />
                    Reel Max Size : 50 MB
                  </p>

                  <div className="mt-8 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-medium transition">
                    Choose File
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  {data.media.type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(data.media)}
                      alt=""
                      className="max-h-65 rounded-xl object-cover"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(data.media)}
                      controls
                      className="max-h-65 rounded-xl"
                    />
                  )}

                  <span className="mt-5 text-green-400 font-medium">
                    {data.media.name}
                  </span>

                  <span className="text-zinc-400 text-sm mt-2">
                    {(data.media.size / (1024 * 1024)).toFixed(2)} MB
                  </span>

                  <span className="mt-3 px-4 py-1 rounded-full bg-violet-600 text-sm">
                    {data.postType === "reel" ? "🎥 Reel" : "📷 Post"}
                  </span>
                </div>
              )}

              <input
                id="media"
                type="file"
                accept="image/*,video/*"
                hidden
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Form Section */}

          <div className="bg-[#222] rounded-3xl p-6 space-y-6">
            <div>
              <label className="block mb-2 font-medium">Caption</label>

              <textarea
                rows="5"
                name="caption"
                value={data.caption}
                onChange={handleChange}
                className="w-full bg-[#181818] rounded-xl p-4 outline-none border border-zinc-700 focus:border-violet-500 resize-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Post Type</label>

              <select
                name="postType"
                value={data.postType}
                onChange={handleChange}
                className="w-full bg-[#181818] rounded-xl p-4 border border-zinc-700 outline-none focus:border-violet-500"
              >
                <option value="post">Post</option>
                <option value="reel">Reel</option>
              </select>
            </div>
            {/* 
            <div>
              <label className="block mb-2 font-medium">Tags</label>

              <div className="flex items-center bg-[#181818] rounded-xl px-4 border border-zinc-700 focus-within:border-violet-500">
                <Hash className="text-zinc-400" size={20} />

                <input
                  type="text"
                  name="tags"
                  value={data.tags}
                  onChange={handleChange}
                  placeholder="react, travel, nature"
                  className="w-full bg-transparent p-4 outline-none"
                />
              </div>
            </div> */}

            <button className="w-full bg-violet-600 hover:bg-violet-700 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition">
              <Upload size={20} />
              Publish Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
