import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../../services/authService";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const location = useLocation();

  const navigate = useNavigate();

  const { email, fullname, username } = location.state;

  const inputRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const otpCopy = [...otp];

    otpCopy[index] = value;

    setOtp(otpCopy);

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOTP = otp.join("");

    if (finalOTP.length !== 6) {
      alert("Please enter a valid OTP");
      return;
    }

    try {
      const response = await verifyOTP({
        email,
        fullname,
        username,
        otp: finalOTP,
      });

      alert(response.message);

      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#090909] flex items-center justify-center px-5">
      <div className="w-full max-w-lg">
        <h1 className="text-white text-5xl font-bold">Verify OTP</h1>

        <p className="text-gray-400 mt-5 text-lg leading-8">
          We've sent a verification code to your email. Enter the 6-digit OTP
          below.
        </p>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="
                w-14
                h-16
                sm:w-16
                sm:h-20
                rounded-2xl
                bg-[#171717]
                border
                border-[#2E2E2E]
                text-white
                text-2xl
                text-center
                outline-none
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/30
                transition
                "
              />
            ))}
          </div>

          <button
            className="
            mt-10
            w-full
            h-16
            rounded-3xl
            bg-white
            text-black
            text-xl
            font-semibold
            hover:bg-gray-200
            transition
            "
          >
            Verify OTP
          </button>
        </form>

        <div className="mt-8 flex justify-between items-center">
          <button className="text-violet-400 hover:underline">
            Resend OTP
          </button>

          <span className="text-gray-500">00:59</span>
        </div>

        <p className="text-gray-500 mt-10 text-center">
          Wrong Email?
          <Link to="/signup" className="text-violet-400 ml-2 hover:underline">
            Go Back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
