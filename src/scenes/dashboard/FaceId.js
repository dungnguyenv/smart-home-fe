import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { env_map } from "../../env";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FaceId.css'
import { sendLog } from "../../firebase/FirebaseConfig";
import { database } from "../../firebase/FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { formatFloat } from "../../firebase/CommonFunction";

var users = {}
onValue(ref(database, '/users'), (snapshot) => {
    console.log("Data Face Id: " + JSON.stringify(snapshot.val()))

    users = (Object.values(snapshot.val()))
    console.log("SET USERS: ", users)
}, {
    onlyOnce: false
});

const FaceId = ({ authentication }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [ready, setReady] = useState(false)
    const MAIN_API_SERVICE_URL = env_map.MAIN_API_SERVICE_URL
    const defaultToastStyle = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };

    useEffect(() => {
        const loginByFaceId = setInterval(capture, 1000)
        setTimeout(() => {
            setReady(true)
        }, 800)
        return () => {
            console.log("clear internal: loginByFaceId")
            clearInterval(loginByFaceId);
        };
    }, [])

    console.log('Authentication: ', authentication)
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);

        sendToServer(imageSrc)

    }, [webcamRef, setImgSrc]);


    const sendToServer = (base64Image) => {
        // Replace 'serverEndpoint' with your server's endpoint URL
        fetch(MAIN_API_SERVICE_URL + "/login/faceid", {
            method: 'POST',
            body: base64Image,
            headers: {
                'Content-Type': 'application/octet-stream' // Specify the appropriate content type
            }
        })
            .then((response) => response.json())
            .then((result) => {

                // console.log("Recognied: ", result['username'])
                // console.log("USERS: ", users)
                const username = result['username']
                const user = users.find(data => data.username == username)
                // console.log("Recognied: ", user)
                if (user) {
                    toast.success('Recognized ' + user['fullName'] + ' with ' + formatFloat(result['confidence']) + '% accuracy')
                    sendLog({
                        "action": "Sign in",
                        "time": (new Date).getTime(),
                        "user-id": user.id,
                        "user-full-name": user["fullName"]
                    })

                    setTimeout(() => {
                        toast.success('Recognized ' + user['fullName'] + ' with ' + formatFloat(result['confidence']) + '% accuracy')
                        toast.success('Login Successfully!')
                        authentication.setIsAuthenticated(true)
                        authentication.setUser(user)
                    }, 500)

                } else {
                    toast.error('Recognized ' + username + ' with ' + formatFloat(result['confidence']) + '% accuracy but this account was not used')
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <div className="father">
                <Webcam
                    className="first"
                    style={{ borderRadius: "20px", height: '620px' }}
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                {ready && <img
                    className="second"
                    src='https://scontent.fhan8-1.fna.fbcdn.net/v/t1.15752-9/354720398_1316219165643670_7912227198503603394_n.png?_nc_cat=101&cb=99be929b-59f725be&ccb=1-7&_nc_sid=ae9488&_nc_ohc=slD2yCT2TBcAX-0FD6q&_nc_ht=scontent.fhan8-1.fna&oh=03_AdSHFKKEZNR7kkWQymD9cne0KMPk4Uxx8KwAwh744YU0bA&oe=64B9EE6C'
                    style={{ height: '620px' }}
                />}
            </div>
            {/* <button onClick={capture}>Capture photo</button>
            {imgSrc && (
                <img style={{ marginTop: '600px' }}
                    src={imgSrc}
                />
            )} */}
            {/* <ToastContainer /> */}
        </>
    );
};

// ReactDOM.render(<WebcamCapture />, document.getElementById("root"));

// https://www.npmjs.com/package/react-webcam

export default FaceId;


