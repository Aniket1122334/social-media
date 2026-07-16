import { FaGoogle } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { loginUser } from "../../redux/slices/authSlice";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    checked: false,
  });

  const emailRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  return (
    <>
      <div className="w-[60%] h-full px-9 py-8 md:py-12 flex flex-col justify-center">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-white tracking-tight">
            Welcome Back
          </h1>
        </div>

        <form onSubmit={handleLogin} className="mt-10 md:mt-12 space-y-8">
          {/* Email */}
          <div>
            <label
              htmlFor="form-email"
              className="block text-gray-300 text-base md:text-lg mb-2 p-1 font-medium"
            >
              Email Address
            </label>

            <input
              ref={emailRef}
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email address"
              id="form-email"
              className="w-full h-14 md:h-16 bg-[#171717] border border-[#2E2E2E] rounded-3xl text-white placeholder:text-white p-5.5 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 outline-none transition-all duration-300 hover:border-gray-600"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="form-password"
              className="block text-gray-300 text-base md:text-lg mb-2 p-1 font-medium"
            >
              Password
            </label>

            <div className="relative group">
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                id="form-password"
                className="w-full h-14 md:h-16 bg-[#171717] border border-[#2E2E2E] rounded-3xl px-6 pr-14 text-white placeholder:text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 outline-none transition-all duration-300 hover:border-gray-600"
                required
              />

              <IoEyeOutline className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-300 cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
            <label className="flex items-center gap-3 cursor-pointer text-[20px]">
              <input
                checked={formData.checked}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    checked: e.target.checked,
                  })
                }
                type="checkbox"
                className="w-5 h-5 accent-violet-500 bg-[#171717] border-[#2E2E2E] rounded focus:ring-violet-500"
              />

              <span className="text-gray-300">Keep me signed in</span>
            </label>

            <button
              type="button"
              className="text-violet-400 text-xl hover:text-violet-300 font-medium transition-colors cursor-pointer"
            >
              Forgot password
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          {/* Sign In */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 md:h-16 rounded-3xl bg-white text-black text-xl md:text-2xl font-semibold mt-4 hover:bg-gray-100 active:scale-[0.985] transition-all duration-200 shadow-lg shadow-violet-500/10 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#2E2E2E] to-transparent" />
          <span className="text-gray-500 text-lg font-medium px-4">
            Or continue with
          </span>
          <div className="bg-[#2E2E2E] flex-1 h-px bg-linear-to-r from-[#2E2E2E] via-[#2E2E2E] to-transparent" />
        </div>

        {/* Google */}
        <button className="w-full h-14 md:h-16 border border-[#2E2E2E] rounded-3xl flex items-center justify-center gap-4 text-white hover:bg-orange-700 active:bg-[#1A1A1A] transition-all duration-200 hover:border-gray-600 cursor-pointer">
          <FaGoogle className="text-2xl" />
          <span className="font-medium">Continue with Google</span>
        </button>

        {/* Signup */}
        <div>
          <p className="text-center text-gray-500 mt-10 text-lg md:text-base">
            New to our platform?
            <span className="text-violet-400 hover:text-violet-300 font-medium cursor-pointer hover:underline transition-colors">
              {" "}
              <Link to="/signup">Create Account</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
