import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/slices/userSlice";
import { updateAuthUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

import {
  Camera,
  User,
  AtSign,
  Mail,
  FileText,
  Save,
  ArrowLeft,
} from "lucide-react";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, loading } = useSelector((state) => state.users);

  const authUser = useSelector((state) => state.auth.user);

  console.log(authUser);

  const [formData, setFormData] = useState({
    fullname: currentUser?.fullname || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
    profilePicture: currentUser?.profilePicture || "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "profilePicture" ? files?.[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("fullname", formData.fullname);
    data.append("username", formData.username);
    data.append("bio", formData.bio);

    if (formData.profilePicture instanceof File) {
      data.append("profilePicture", formData.profilePicture);
    }

    const result = await dispatch(updateProfile(data));

    if (updateProfile.fulfilled.match(result)) {
      dispatch(
        updateAuthUser({
          id: result.payload.user.id,
          fullname: result.payload.user.fullname,
          username: result.payload.user.username,
          email: result.payload.user.email,
          profilePicture: result.payload.user.profilePicture,
        }),
      );

      navigate("/profile");
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

          w-[calc(100vw-5rem)]
          min-h-screen

          px-3
          sm:px-6
          md:px-8
          lg:px-0

          py-5
          sm:py-8

          overflow-x-hidden
        "
      >
        {/* =====================================================
            CONTAINER
        ====================================================== */}

        <div
          className="
            mx-auto
            w-full

            lg:w-[80vw]

            max-w-225
          "
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3

              mb-5
              sm:mb-7
              md:mb-8
            "
          >
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="
                w-10
                h-10

                sm:w-11
                sm:h-11

                rounded-full

                bg-[#1a1a1a]

                border
                border-zinc-800

                flex
                items-center
                justify-center

                hover:bg-zinc-800

                transition

                cursor-pointer

                shrink-0
              "
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl

                  font-bold
                "
              >
                Edit Profile
              </h1>

              <p
                className="
                  text-zinc-500

                  text-xs
                  sm:text-sm

                  mt-1
                "
              >
                Update your profile information
              </p>
            </div>
          </div>

          {/* =================================================
              PROFILE CARD
          ================================================= */}

          <div
            className="
              bg-[#111]

              border
              border-zinc-800

              rounded-2xl
              sm:rounded-3xl

              overflow-hidden

              shadow-2xl
            "
          >
            {/* =================================================
                PROFILE PICTURE SECTION
            ================================================= */}

            <div
              className="
                p-5
                sm:p-7
                md:p-8

                border-b
                border-zinc-800

                flex

                flex-col
                sm:flex-row

                items-center
                sm:items-start

                gap-5
                sm:gap-7
              "
            >
              {/* Avatar */}

              <div className="relative shrink-0">
                <img
                  src={
                    formData.profilePicture instanceof File
                      ? URL.createObjectURL(formData.profilePicture)
                      : formData.profilePicture ||
                        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                  }
                  alt="Profile"
                  className="
                    w-28
                    h-28

                    sm:w-32
                    sm:h-32

                    md:w-36
                    md:h-36

                    rounded-full

                    object-cover

                    border-4
                    border-zinc-800

                    bg-zinc-900
                  "
                />

                {/* Camera Badge */}

                <label
                  htmlFor="profilePicture"
                  className="
                    absolute

                    bottom-1
                    right-1

                    w-9
                    h-9

                    sm:w-10
                    sm:h-10

                    rounded-full

                    bg-violet-600

                    border-4
                    border-[#111]

                    flex
                    items-center
                    justify-center

                    cursor-pointer

                    hover:bg-violet-700

                    transition
                  "
                >
                  <Camera size={17} />

                  <input
                    id="profilePicture"
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    className="hidden"
                    disabled={loading}
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* Picture Details */}

              <div
                className="
                  text-center
                  sm:text-left

                  flex-1

                  min-w-0
                "
              >
                <h2
                  className="
                    text-lg
                    sm:text-xl

                    font-semibold

                    break-all
                  "
                >
                  {currentUser?.username || formData.username || "Your Profile"}
                </h2>

                <p
                  className="
                    text-zinc-400

                    text-sm

                    mt-1
                  "
                >
                  Choose a profile picture that represents you.
                </p>

                <label
                  htmlFor="profilePicture"
                  className="
                    inline-flex
                    items-center
                    justify-center

                    gap-2

                    mt-4

                    px-5
                    py-2.5

                    rounded-xl

                    bg-violet-600
                    hover:bg-violet-700

                    text-sm
                    font-semibold

                    cursor-pointer

                    transition
                  "
                >
                  <Camera size={17} />
                  Change Picture
                </label>

                <p
                  className="
                    text-xs
                    text-zinc-600

                    mt-3
                  "
                >
                  JPG, JPEG or PNG • Max 5 MB
                </p>
              </div>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="
                p-5
                sm:p-7
                md:p-8

                space-y-5
                sm:space-y-6
              "
            >
              {/* =================================================
                  FULL NAME
              ================================================= */}

              <div>
                <label
                  className="
                    block

                    mb-2

                    text-sm
                    sm:text-base

                    font-medium

                    text-zinc-300
                  "
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="
                      absolute

                      left-4

                      top-1/2
                      -translate-y-1/2

                      text-zinc-500
                    "
                  />

                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    disabled={loading}
                    className="
                      w-full

                      h-12
                      sm:h-14

                      bg-[#1a1a1a]

                      border
                      border-zinc-800

                      rounded-xl

                      pl-12
                      pr-4

                      text-sm
                      sm:text-base

                      text-white

                      outline-none

                      focus:border-violet-500
                      focus:ring-2
                      focus:ring-violet-500/20

                      disabled:opacity-60

                      transition
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  USERNAME
              ================================================= */}

              <div>
                <label
                  className="
                    block

                    mb-2

                    text-sm
                    sm:text-base

                    font-medium

                    text-zinc-300
                  "
                >
                  Username
                </label>

                <div className="relative">
                  <AtSign
                    size={19}
                    className="
                      absolute

                      left-4

                      top-1/2
                      -translate-y-1/2

                      text-zinc-500
                    "
                  />

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                    className="
                      w-full

                      h-12
                      sm:h-14

                      bg-[#1a1a1a]

                      border
                      border-zinc-800

                      rounded-xl

                      pl-12
                      pr-4

                      text-sm
                      sm:text-base

                      text-white

                      outline-none

                      focus:border-violet-500
                      focus:ring-2
                      focus:ring-violet-500/20

                      disabled:opacity-60

                      transition
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div>
                <label
                  className="
                    block

                    mb-2

                    text-sm
                    sm:text-base

                    font-medium

                    text-zinc-300
                  "
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="
                      absolute

                      left-4

                      top-1/2
                      -translate-y-1/2

                      text-zinc-600
                    "
                  />

                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="
                      w-full

                      h-12
                      sm:h-14

                      bg-[#151515]

                      border
                      border-zinc-800

                      rounded-xl

                      pl-12
                      pr-4

                      text-sm
                      sm:text-base

                      text-zinc-500

                      outline-none

                      cursor-not-allowed
                    "
                  />
                </div>

                <p
                  className="
                    text-xs
                    text-zinc-600

                    mt-2
                  "
                >
                  Email address cannot be changed.
                </p>
              </div>

              {/* =================================================
                  BIO
              ================================================= */}

              <div>
                <label
                  className="
                    block

                    mb-2

                    text-sm
                    sm:text-base

                    font-medium

                    text-zinc-300
                  "
                >
                  Bio
                </label>

                <div className="relative">
                  <FileText
                    size={19}
                    className="
                      absolute

                      left-4
                      top-4

                      text-zinc-500
                    "
                  />

                  <textarea
                    rows={5}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Tell something about yourself..."
                    className="
                      w-full

                      bg-[#1a1a1a]

                      border
                      border-zinc-800

                      rounded-xl

                      pl-12
                      pr-4
                      py-3.5

                      text-sm
                      sm:text-base

                      text-white

                      placeholder:text-zinc-600

                      resize-none

                      outline-none

                      focus:border-violet-500
                      focus:ring-2
                      focus:ring-violet-500/20

                      disabled:opacity-60

                      transition
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div
                className="
                  pt-2
                  sm:pt-4

                  flex

                  flex-col-reverse
                  sm:flex-row

                  gap-3
                  sm:gap-4
                "
              >
                {/* Cancel */}

                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  disabled={loading}
                  className="
                    w-full
                    sm:w-auto

                    sm:min-w-35

                    h-12
                    sm:h-14

                    px-6

                    rounded-xl

                    border
                    border-zinc-700

                    text-zinc-300

                    text-sm
                    sm:text-base

                    font-semibold

                    hover:bg-zinc-800

                    disabled:opacity-50

                    transition

                    cursor-pointer
                  "
                >
                  Cancel
                </button>

                {/* Save */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    sm:flex-1

                    h-12
                    sm:h-14

                    rounded-xl

                    bg-violet-600

                    hover:bg-violet-700

                    disabled:bg-violet-900
                    disabled:cursor-not-allowed

                    text-white

                    text-sm
                    sm:text-base

                    font-semibold

                    flex
                    items-center
                    justify-center

                    gap-2

                    transition
                  "
                >
                  {loading ? (
                    <>
                      <div
                        className="
                          w-5
                          h-5

                          border-2
                          border-white
                          border-t-transparent

                          rounded-full

                          animate-spin
                        "
                      />
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <Save size={19} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
