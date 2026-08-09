import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/slices/userSlice";
import { updateAuthUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, loading } = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.auth.user);
  console.log(authUser);

  const [formData, setFormData] = useState({
    fullname: currentUser?.fullname,
    username: currentUser?.username,
    email: currentUser?.email,
    bio: currentUser?.bio,
    profilePicture: currentUser?.profilePicture,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "profilePicture" ? files[0] : value,
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
    <div className="min-h-screen w-screen bg-[#0d0d0d] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-[#181818] border border-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-10">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture */}

          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={
                formData.profilePicture instanceof File
                  ? URL.createObjectURL(formData.profilePicture)
                  : formData.profilePicture ||
                    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
            />

            <div>
              <label
                className={`inline-block px-6 py-3 rounded-lg font-semibold transition ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                Change Profile Picture
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  className="hidden"
                  disabled={loading}
                  onChange={handleChange}
                />
              </label>

              <p className="text-sm text-gray-400 mt-3">
                JPG, JPEG or PNG (Max 5 MB)
              </p>
            </div>
          </div>

          {/* Full Name */}

          <div>
            <label className="block mb-2 text-gray-300">Full Name</label>

            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-[#262626] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Username */}

          <div>
            <label className="block mb-2 text-gray-300">Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-[#262626] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block mb-2 text-gray-300">Email</label>

            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Bio */}

          <div>
            <label className="block mb-2 text-gray-300">Bio</label>

            <textarea
              rows={4}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={loading}
              placeholder="Tell something about yourself..."
              className="w-full bg-[#262626] border border-gray-700 rounded-lg px-4 py-3 resize-none outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Save Button */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}

            {loading ? "Updating Profile..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
