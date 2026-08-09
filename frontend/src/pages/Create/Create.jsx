import { ImagePlus, Upload } from "lucide-react";
import { useDispatch } from "react-redux";
import { createNewPost } from "../../redux/slices/postSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    caption: "",
    media: null,
    postType: "post",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const MAX_REEL_SIZE = 50 * 1024 * 1024; // 50 MB

  // =====================================================
  // Handle Input / Select Change
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // Handle Media Upload
  // =====================================================

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // ================= VIDEO =================

    if (file.type.startsWith("video")) {
      if (file.size > MAX_REEL_SIZE) {
        alert("Reel size must be less than or equal to 50 MB.");

        e.target.value = "";
        return;
      }

      // Create preview URL
      const url = URL.createObjectURL(file);

      setPreviewUrl((oldUrl) => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }

        return url;
      });

      setData((prev) => ({
        ...prev,
        media: file,
        postType: "reel",
      }));

      return;
    }

    // ================= IMAGE =================

    if (file.type.startsWith("image")) {
      // Create preview URL
      const url = URL.createObjectURL(file);

      setPreviewUrl((oldUrl) => {
        if (oldUrl) {
          URL.revokeObjectURL(oldUrl);
        }

        return url;
      });

      setData((prev) => ({
        ...prev,
        media: file,
        postType: "post",
      }));

      return;
    }

    // ================= INVALID FILE =================

    alert("Only images and videos are allowed.");

    e.target.value = "";
  };

  // =====================================================
  // Cleanup Preview URL
  // =====================================================

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // =====================================================
  // Submit Form
  // =====================================================

  const handleCreateForm = async (e) => {
    e.preventDefault();

    if (!data.media) {
      alert("Please select an image or video.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("caption", data.caption);
      formData.append("media", data.media);
      formData.append("postType", data.postType);

      const result = await dispatch(createNewPost(formData));

      // ================= SUCCESS =================

      if (createNewPost.fulfilled.match(result)) {
        alert(result.payload?.message || "Post created successfully!");

        navigate("/");
      }

      // ================= ERROR =================
      else {
        alert(result.payload || "Failed to create post.");
      }
    } catch (error) {
      console.error("Create post error:", error);

      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="
          ml-20
          min-h-screen
          w-[calc(100vw-5rem)]

          px-4
          sm:px-6
          md:px-8
          lg:px-0

          py-6
          sm:py-8

          overflow-x-hidden
        "
      >
        {/* =====================================================
            RESPONSIVE CONTAINER
        ====================================================== */}

        <div
          className="
            mx-auto
            w-full

            lg:w-[80vw]

            max-w-350
          "
        >
          {/* =================================================
              HEADING
          ================================================= */}

          <div className="mb-6 sm:mb-8">
            <h1
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-bold
              "
            >
              Create New Post
            </h1>

            <p
              className="
                text-zinc-400
                mt-2
                text-sm
                sm:text-base
              "
            >
              Share your favorite moments with your followers.
            </p>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleCreateForm}>
            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-2

                gap-5
                sm:gap-6
                lg:gap-8
              "
            >
              {/* =================================================
                  UPLOAD SECTION
              ================================================= */}

              <div
                className="
                  bg-[#222]

                  rounded-2xl
                  sm:rounded-3xl

                  p-4
                  sm:p-6

                  min-w-0
                "
              >
                <label
                  htmlFor="media"
                  className="
                    border-2
                    border-dashed
                    border-zinc-600

                    rounded-2xl
                    sm:rounded-3xl

                    min-h-100
                    sm:min-h-112.5

                    flex
                    flex-col
                    items-center
                    justify-center

                    cursor-pointer

                    hover:border-violet-500

                    transition

                    overflow-hidden

                    p-4
                    sm:p-6
                  "
                >
                  {!data.media ? (
                    <>
                      {/* Upload Icon */}

                      <ImagePlus
                        size={55}
                        className="
                          text-violet-500

                          sm:w-17.5
                          sm:h-17.5
                        "
                      />

                      {/* Heading */}

                      <h2
                        className="
                          text-lg
                          sm:text-xl

                          font-semibold

                          mt-5
                          sm:mt-6

                          text-center
                        "
                      >
                        Upload Image / Reel
                      </h2>

                      {/* Description */}

                      <p
                        className="
                          text-zinc-400

                          mt-2

                          text-sm
                          sm:text-base

                          text-center
                        "
                      >
                        Drag & Drop your media here
                        <br />
                        or click to browse
                      </p>

                      {/* Supported Formats */}

                      <p
                        className="
                          text-xs
                          sm:text-sm

                          text-zinc-500

                          mt-3

                          text-center
                        "
                      >
                        JPG • PNG • WEBP • MP4
                        <br />
                        Reel Max Size : 50 MB
                      </p>

                      {/* Choose File */}

                      <div
                        className="
                          mt-6
                          sm:mt-8

                          bg-violet-600
                          hover:bg-violet-700

                          px-5
                          sm:px-6

                          py-2.5
                          sm:py-3

                          rounded-xl

                          text-sm
                          sm:text-base

                          font-medium

                          transition
                        "
                      >
                        Choose File
                      </div>
                    </>
                  ) : (
                    <div
                      className="
                        w-full
                        h-full
                        min-h-90

                        flex
                        flex-col
                        items-center
                        justify-center

                        p-2
                        sm:p-4
                      "
                    >
                      {/* ================= IMAGE ================= */}

                      {data.media.type.startsWith("image") ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="
                            w-full

                            max-h-70
                            sm:max-h-80
                            md:max-h-87.5

                            rounded-xl

                            object-contain
                          "
                        />
                      ) : (
                        /* ================= VIDEO ================= */

                        <video
                          src={previewUrl}
                          controls
                          className="
                            w-full

                            max-h-70
                            sm:max-h-80
                            md:max-h-87.5

                            rounded-xl

                            object-contain

                            bg-black
                          "
                        />
                      )}

                      {/* File Name */}

                      <span
                        className="
                          mt-4
                          sm:mt-5

                          text-green-400

                          font-medium

                          text-sm
                          sm:text-base

                          text-center

                          break-all
                        "
                      >
                        {data.media.name}
                      </span>

                      {/* File Size */}

                      <span
                        className="
                          text-zinc-400

                          text-xs
                          sm:text-sm

                          mt-2
                        "
                      >
                        {(data.media.size / (1024 * 1024)).toFixed(2)} MB
                      </span>

                      {/* Post Type */}

                      <span
                        className="
                          mt-3

                          px-4
                          py-1

                          rounded-full

                          bg-violet-600

                          text-xs
                          sm:text-sm
                        "
                      >
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

              {/* =================================================
                  FORM SECTION
              ================================================= */}

              <div
                className="
                  bg-[#222]

                  rounded-2xl
                  sm:rounded-3xl

                  p-4
                  sm:p-6
                  md:p-7

                  space-y-5
                  sm:space-y-6

                  h-fit
                "
              >
                {/* ================= Caption ================= */}

                <div>
                  <label
                    className="
                      block
                      mb-2

                      font-medium

                      text-sm
                      sm:text-base
                    "
                  >
                    Caption
                  </label>

                  <textarea
                    rows="5"
                    name="caption"
                    value={data.caption}
                    onChange={handleChange}
                    placeholder="Write a caption..."
                    className="
                      w-full

                      bg-[#181818]

                      rounded-xl

                      p-3
                      sm:p-4

                      text-sm
                      sm:text-base

                      outline-none

                      border
                      border-zinc-700

                      focus:border-violet-500

                      resize-none

                      transition
                    "
                  />
                </div>

                {/* ================= Post Type ================= */}

                <div>
                  <label
                    className="
                      block
                      mb-2

                      font-medium

                      text-sm
                      sm:text-base
                    "
                  >
                    Post Type
                  </label>

                  <select
                    name="postType"
                    value={data.postType}
                    onChange={handleChange}
                    className="
                      w-full

                      bg-[#181818]

                      rounded-xl

                      p-3
                      sm:p-4

                      text-sm
                      sm:text-base

                      border
                      border-zinc-700

                      outline-none

                      focus:border-violet-500

                      transition
                    "
                  >
                    <option value="post">Post</option>

                    <option value="reel">Reel</option>
                  </select>
                </div>

                {/* ================= Publish ================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full

                    bg-violet-600
                    hover:bg-violet-700

                    disabled:bg-violet-900
                    disabled:cursor-not-allowed

                    py-3
                    sm:py-4

                    rounded-xl

                    font-semibold

                    text-sm
                    sm:text-base

                    flex
                    items-center
                    justify-center
                    gap-3

                    transition
                  "
                >
                  <Upload size={20} />

                  {loading ? "Publishing..." : "Publish Post"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Create;
