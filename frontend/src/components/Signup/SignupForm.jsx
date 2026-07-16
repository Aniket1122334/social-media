import { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authService";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const fullnameRef = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    fullnameRef.current.focus();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await signupUser(formData);

      // console.log(response);

      if (response.success) {
        alert(response.message);
        navigate("/verify-otp", {
          state: {
            fullname: formData.fullname,
            username: formData.username,
            email: formData.email,
          },
        });
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl px-3 py-3">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          Create Account
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Join us and start your journey today.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleForm}>
        {/* Full Name */}
        <div>
          <label className="block text-gray-300 mb-3 font-medium">
            Full Name
          </label>

          <input
            value={formData.fullname}
            ref={fullnameRef}
            onChange={(e) => {
              setFormData({ ...formData, fullname: e.target.value });
            }}
            name="fullname"
            type="text"
            placeholder="Enter your full name"
            className="w-full h-16 rounded-3xl bg-[#171717] border border-[#2E2E2E]
            px-6 text-white placeholder:text-gray-500
            focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30
            outline-none transition"
            required
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-gray-300 mb-3 font-medium">
            Username
          </label>

          <input
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
            name="username"
            type="text"
            placeholder="username"
            className="w-full h-16 rounded-3xl bg-[#171717] border border-[#2E2E2E]
            px-6 text-white placeholder:text-gray-500
            focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30
            outline-none transition"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 mb-3 font-medium">
            Email Address
          </label>

          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            name="email"
            placeholder="Enter your email"
            className="w-full h-16 rounded-3xl bg-[#171717] border border-[#2E2E2E]
            px-6 text-white placeholder:text-gray-500
            focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30
            outline-none transition"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 mb-3 font-medium">
            Password
          </label>

          <div className="relative">
            <input
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              name="password"
              type="password"
              placeholder="Create password"
              className="w-full h-16 rounded-3xl bg-[#171717] border border-[#2E2E2E]
              px-6 pr-14 text-white placeholder:text-gray-500
              focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30
              outline-none transition"
              required
            />

            <IoEyeOutline className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-300 mb-3 font-medium">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                });
              }}
              name="confirmPassword"
              placeholder="Confirm password"
              className="w-full h-16 rounded-3xl bg-[#171717] border border-[#2E2E2E]
              px-6 pr-14 text-white placeholder:text-gray-500
              focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30
              outline-none transition"
              required
            />

            <IoEyeOutline className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" className="mt-1 w-5 h-5 accent-violet-500" />

          <span className="text-gray-400 text-sm leading-6">
            I agree to the{" "}
            <span className="text-violet-400 cursor-pointer hover:underline">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="text-violet-400 cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </span>
        </label>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full h-16 rounded-3xl bg-white text-black
          text-xl font-semibold hover:bg-gray-100
          transition cursor-pointer"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-[#2E2E2E]" />

        <span className="text-gray-500">Or continue with</span>

        <div className="flex-1 h-px bg-[#2E2E2E]" />
      </div>

      {/* Google */}
      <button
        className="w-full h-16 rounded-3xl border border-[#2E2E2E]
        flex items-center justify-center gap-4 text-white
        hover:bg-orange-700 cursor-pointer transition"
      >
        <FaGoogle className="text-xl" />
        Continue with Google
      </button>

      {/* Login */}
      <p className="text-center text-gray-500 mt-8">
        Already have an account?
        <span className="text-violet-400 ml-2 cursor-pointer hover:underline">
          <Link to="/login">Sign In</Link>
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
