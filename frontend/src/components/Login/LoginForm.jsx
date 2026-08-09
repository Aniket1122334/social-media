import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

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

  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  // =====================================================
  // Auto Focus Email
  // =====================================================

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // =====================================================
  // Redirect After Login
  // =====================================================

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // =====================================================
  // Login
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    await dispatch(loginUser(formData));
  };

  return (
    <div
      className="
        w-full

        max-w-130

        mx-auto

        px-4
        sm:px-6
        md:px-0

        py-6
        sm:py-8
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="text-center sm:text-left">
        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl

            font-bold

            text-white

            tracking-tight
          "
        >
          Welcome Back
        </h1>

        <p
          className="
            text-gray-400

            text-sm
            sm:text-base

            mt-2
          "
        >
          Login to continue
        </p>
      </div>

      {/* =====================================================
          LOGIN FORM
      ====================================================== */}

      <form
        onSubmit={handleLogin}
        className="
          mt-8
          sm:mt-10
          md:mt-12

          space-y-6
          sm:space-y-7
        "
      >
        {/* =================================================
            EMAIL
        ================================================= */}

        <div>
          <label
            htmlFor="form-email"
            className="
              block

              text-gray-300

              text-sm
              sm:text-base

              mb-2

              font-medium
            "
          >
            Email Address
          </label>

          <input
            ref={emailRef}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            placeholder="Enter your email address"
            id="form-email"
            className="
              w-full

              h-13
              sm:h-14
              md:h-16

              bg-[#171717]

              border
              border-[#2E2E2E]

              rounded-2xl
              sm:rounded-3xl

              px-4
              sm:px-5

              text-sm
              sm:text-base

              text-white

              placeholder:text-gray-500

              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/30

              outline-none

              transition-all
              duration-300

              hover:border-gray-600
            "
            required
          />
        </div>

        {/* =================================================
            PASSWORD
        ================================================= */}

        <div>
          <label
            htmlFor="form-password"
            className="
              block

              text-gray-300

              text-sm
              sm:text-base

              mb-2

              font-medium
            "
          >
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              placeholder="Enter your password"
              id="form-password"
              className="
                w-full

                h-13
                sm:h-14
                md:h-16

                bg-[#171717]

                border
                border-[#2E2E2E]

                rounded-2xl
                sm:rounded-3xl

                px-4
                sm:px-6

                pr-14

                text-sm
                sm:text-base

                text-white

                placeholder:text-gray-500

                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/30

                outline-none

                transition-all
                duration-300

                hover:border-gray-600
              "
              required
            />

            {/* Show / Hide Password */}

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
                absolute

                right-4
                sm:right-6

                top-1/2
                -translate-y-1/2

                text-gray-400

                hover:text-white

                transition

                cursor-pointer
              "
            >
              {showPassword ? (
                <IoEyeOffOutline size={22} />
              ) : (
                <IoEyeOutline size={22} />
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            REMEMBER + FORGOT
        ================================================= */}

        <div
          className="
            flex

            flex-col
            sm:flex-row

            sm:items-center
            sm:justify-between

            gap-4
          "
        >
          {/* Remember */}

          <label
            className="
              flex
              items-center
              gap-2.5

              cursor-pointer

              text-sm
              sm:text-base

              text-gray-300
            "
          >
            <input
              checked={formData.checked}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  checked: e.target.checked,
                })
              }
              type="checkbox"
              className="
                w-4
                h-4
                sm:w-5
                sm:h-5

                accent-violet-500

                cursor-pointer
              "
            />

            <span>Keep me signed in</span>
          </label>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            className="
              bg-red-500/10

              border
              border-red-500/30

              rounded-xl

              px-4
              py-3

              text-center
            "
          >
            <p
              className="
                text-red-400

                text-sm
                sm:text-base
              "
            >
              {error}
            </p>
          </div>
        )}

        {/* =================================================
            SIGN IN
        ================================================= */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full

            h-13
            sm:h-14
            md:h-16

            rounded-2xl
            sm:rounded-3xl

            bg-white

            text-black

            text-base
            sm:text-lg
            md:text-xl

            font-semibold

            hover:bg-gray-100

            active:scale-[0.985]

            transition-all
            duration-200

            shadow-lg
            shadow-violet-500/10

            cursor-pointer

            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* =====================================================
          DIVIDER
      ====================================================== */}

      <div
        className="
          flex
          items-center

          gap-3
          sm:gap-4

          my-8
          sm:my-10
        "
      >
        <div className="flex-1 h-px bg-[#2E2E2E]" />

        <span
          className="
            text-gray-500

            text-xs
            sm:text-sm

            font-medium

            whitespace-nowrap
          "
        >
          Or
        </span>

        <div className="flex-1 h-px bg-[#2E2E2E]" />
      </div>

      {/* =====================================================
          SIGNUP
      ====================================================== */}

      <div className="mt-8 sm:mt-10">
        <p
          className="
            text-center

            text-gray-500

            text-sm
            sm:text-base
          "
        >
          New to our platform?
          <Link
            to="/signup"
            className="
              ml-1

              text-violet-400

              hover:text-violet-300

              font-medium

              hover:underline

              transition-colors
            "
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
