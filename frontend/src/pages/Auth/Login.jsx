import LoginForm from "../../components/Login/LoginForm";
import Auth from "./Auth";
import authVideo from "../../../public/login/login.mp4";

const Login = () => {
  return (
    <Auth authVideo={authVideo}>
      <LoginForm />
    </Auth>
  );
};

export default Login;
