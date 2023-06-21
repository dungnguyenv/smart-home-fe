import "./LoginScreen.css";
import LoginForm from "./LoginForm";
import FaceId from "../dashboard/FaceId";
import { useState } from "react";

const LoginScreen = ({ authentication }) => {
    const [showFaceId, setShowFaceId] = useState(false);
    return (
        <div>
            <div className="login-screen">
                <LoginForm authentication={authentication} showFaceId={showFaceId}></LoginForm>
            </div>
            <div className="chatbot-icon" onClick={() => setShowFaceId(!showFaceId)}>
                <img src="https://static.vecteezy.com/system/resources/previews/021/038/481/original/face-id-icon-vector.jpg" alt="" />
            </div>
        </div>

    )
}
export default LoginScreen;
