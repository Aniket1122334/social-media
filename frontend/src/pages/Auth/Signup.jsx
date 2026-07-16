import SignupForm from "../../components/Signup/SignupForm";
import Auth from "./Auth";
import authVideo from "/login/signup.mp4";
const Signup = () => {
  return (
    <Auth authVideo={authVideo}>
      <SignupForm />
    </Auth>
  );
};

export default Signup;
