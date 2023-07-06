import styled from "styled-components";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Input from "../../components/Input";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState, useEffect } from "react";
import { sendLog } from "../../firebase/FirebaseConfig";
import { database } from "../../firebase/FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FaceId from "../dashboard/FaceId";

const LoginForm = ({ authentication, showFaceId }) => {
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
  const [loginData, setLoginData] = useState({
    "username": "",
    "password": ""
  })
  console.log('Aucthentication: ', authentication)
  const defaultToastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }
  const [users, setUsers] = useState(null)
  useEffect(() => {
    onValue(ref(database, '/users'), (snapshot) => {
      console.log("Data: " + JSON.stringify(snapshot.val()))

      setUsers(Object.values(snapshot.val()))
      console.log("SET Data: " + users)
    }, {
      onlyOnce: false
    });
  }, [])
  return (
    <div>
      <MainContainer>
        {showFaceId && <FaceId authentication={authentication} />}
        <WelcomeText>Welcome</WelcomeText>
        <InputContainer>
          <Input type="text" placeholder="Email" value={loginData.username} onChange={(event) => {
            setLoginData({
              "username": event.target.value,
              "password": loginData.password
            })
          }} />
          <Input type="password" placeholder="Password" value={loginData.password} onChange={(event) => {
            setLoginData({
              "username": loginData.username,
              "password": event.target.value
            })
          }} />
        </InputContainer>
        <ButtonContainer>
          <Button content="Sign Up" onClick={() => {
            console.log("username: " + loginData.username + " password: " + loginData.password)
            const account = users.find(data => data.username === loginData.username)
            if (!account) {
              toast.error('Username or password is not correct!', defaultToastStyle);
            } else {
              if (account.password === loginData.password) {
                console.log("Login Successfully! ", account)
                authentication.setIsAuthenticated(true)
                authentication.setUser(account)
                sendLog({
                  "action": "Sign in",
                  "time": (new Date).getTime(),
                  "user-id": account.id,
                  "user-full-name": account["fullName"]
                })
                toast.success('Login successfully!', defaultToastStyle);
              } else {
                toast.error('Username or password is not correct!', defaultToastStyle);
              }
            }

          }} />
        </ButtonContainer>
        <LoginWith>OR LOGIN WITH</LoginWith>
        <HorizontalRule />
        <IconsContainer>
          <Icon color={FacebookBackground}>
            <FaFacebookF />
          </Icon>
          <Icon color={InstagramBackground}>
            <FaInstagram />
          </Icon>
          <Icon color={TwitterBackground}>
            <FaTwitter />
          </Icon>
        </IconsContainer>
        <ForgotPassword>Forgot Password ?</ForgotPassword>

      </MainContainer>
      <ToastContainer />
    </div>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;

export default LoginForm;
