import { useEffect, useRef, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fullnameRef = useRef(null);

  const navigate = useNavigate();

  // =====================================================
  // Auto Focus
  // =====================================================

  useEffect(() => {
    fullnameRef.current?.focus();
  }, []);

  // =====================================================
  // Signup
  // =====================================================

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
    <div
      className="
        w-full

        max-w-140

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
          Create Account
        </h1>

        <p
          className="
            text-gray-400

            mt-2
            sm:mt-3

            text-sm
            sm:text-base
            md:text-lg
          "
        >
          Join us and start your journey today.
        </p>
      </div>

      {/* =====================================================
          FORM
      ====================================================== */}

      <form
        className="
          mt-8
          sm:mt-10

          space-y-5
          sm:space-y-6
        "
        onSubmit={handleForm}
      >
        {/* =================================================
            FULL NAME
        ================================================= */}

        <div>
          <label
            className="
              block

              text-gray-300

              text-sm
              sm:text-base

              mb-2
              sm:mb-3

              font-medium
            "
          >
            Full Name
          </label>

          <input
            value={formData.fullname}
            ref={fullnameRef}
            onChange={(e) => {
              setFormData({
                ...formData,
                fullname: e.target.value,
              });
            }}
            name="fullname"
            type="text"
            placeholder="Enter your full name"
            className="
              w-full

              h-13
              sm:h-14
              md:h-16

              rounded-2xl
              sm:rounded-3xl

              bg-[#171717]

              border
              border-[#2E2E2E]

              px-4
              sm:px-6

              text-sm
              sm:text-base

              text-white

              placeholder:text-gray-500

              focus:border-violet-500

              focus:ring-2
              focus:ring-violet-500/30

              outline-none

              transition

              hover:border-gray-600
            "
            required
          />
        </div>

        {/* =================================================
            USERNAME
        ================================================= */}

        <div>
          <label
            className="
              block

              text-gray-300

              text-sm
              sm:text-base

              mb-2
              sm:mb-3

              font-medium
            "
          >
            Username
          </label>

          <input
            value={formData.username}
            onChange={(e) => {
              setFormData({
                ...formData,
                username: e.target.value,
              });
            }}
            name="username"
            type="text"
            placeholder="Enter username"
            className="
              w-full

              h-13
              sm:h-14
              md:h-16

              rounded-2xl
              sm:rounded-3xl

              bg-[#171717]

              border
              border-[#2E2E2E]

              px-4
              sm:px-6

              text-sm
              sm:text-base

              text-white

              placeholder:text-gray-500

              focus:border-violet-500

              focus:ring-2
              focus:ring-violet-500/30

              outline-none

              transition

              hover:border-gray-600
            "
            required
          />
        </div>

        {/* =================================================
            EMAIL
        ================================================= */}

        <div>
          <label
            className="
              block

              text-gray-300

              text-sm
              sm:text-base

              mb-2
              sm:mb-3

              font-medium
            "
          >
            Email Address
          </label>

          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
            name="email"
            placeholder="Enter your email"
            className="
              w-full

              h-13
              sm:h-14
              md:h-16

              rounded-2xl
              sm:rounded-3xl

              bg-[#171717]

              border
              border-[#2E2E2E]

              px-4
              sm:px-6

              text-sm
              sm:text-base

              text-white

              placeholder:text-gray-500

              focus:border-violet-500

              focus:ring-2
              focus:ring-violet-500/30

              outline-none

              transition

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
            className="
              block

              text-gray-300

              text-sm
              sm:text-base

              mb-2
              sm:mb-3

              font-medium
            "
          >
            Password
          </label>

          <div className="relative">
            <input
              value={formData.password}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="
                w-full

                h-13
                sm:h-14
                md:h-16

                rounded-2xl
                sm:rounded-3xl

                bg-[#171717]

                border
                border-[#2E2E2E]

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

                transition

                hover:border-gray-600
              "
              required
            />

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

                cursor-pointer

                transition
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
            CONFIRM PASSWORD
        ================================================= */}

        <div>
          <label
            className="
              block

              text-gray-300

              text-sm
              sm:text-base

              mb-2
              sm:mb-3

              font-medium
            "
          >
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                });
              }}
              name="confirmPassword"
              placeholder="Confirm password"
              className="
                w-full

                h-13
                sm:h-14
                md:h-16

                rounded-2xl
                sm:rounded-3xl

                bg-[#171717]

                border
                border-[#2E2E2E]

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

                transition

                hover:border-gray-600
              "
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="
                absolute

                right-4
                sm:right-6

                top-1/2
                -translate-y-1/2

                text-gray-400

                hover:text-white

                cursor-pointer

                transition
              "
            >
              {showConfirmPassword ? (
                <IoEyeOffOutline size={22} />
              ) : (
                <IoEyeOutline size={22} />
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            TERMS CHECKBOX
        ================================================= */}

        <label
          className="
            flex
            items-start

            gap-3

            cursor-pointer
          "
        >
          <input
            type="checkbox"
            className="
              mt-1

              w-4
              h-4
              sm:w-5
              sm:h-5

              accent-violet-500

              shrink-0

              cursor-pointer
            "
          />

          <span
            className="
              text-gray-400

              text-xs
              sm:text-sm

              leading-5
              sm:leading-6
            "
          >
            I agree to the{" "}
            <span
              className="
                text-violet-400

                cursor-pointer

                hover:underline
              "
            >
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span
              className="
                text-violet-400

                cursor-pointer

                hover:underline
              "
            >
              Privacy Policy
            </span>
          </span>
        </label>

        {/* =================================================
            SEND OTP
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

            transition

            cursor-pointer

            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Sending OTP..." : "Send OTP"}
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
        "
      >
        <div className="flex-1 h-px bg-[#2E2E2E]" />

        <span
          className="
            text-gray-500

            text-xs
            sm:text-sm

            whitespace-nowrap
          "
        >
          Or
        </span>

        <div className="flex-1 h-px bg-[#2E2E2E]" />
      </div>

      {/* =====================================================
          LOGIN
      ====================================================== */}

      <p
        className="
          text-center

          text-gray-500

          mt-7
          sm:mt-8

          text-sm
          sm:text-base
        "
      >
        Already have an account?
        <Link
          to="/login"
          className="
            text-violet-400

            ml-2

            cursor-pointer

            hover:text-violet-300

            hover:underline

            transition
          "
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
