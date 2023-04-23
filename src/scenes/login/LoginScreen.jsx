import "./LoginScreen.css";
import LoginForm from "./LoginForm";

const LoginScreen = ({ authentication }) => {


    return (
        <div className="login-screen">
            <LoginForm authentication={authentication}></LoginForm>
        </div>
    )
}
export default LoginScreen;
