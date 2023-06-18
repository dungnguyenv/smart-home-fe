import React, { useState, useRef } from "react";
import "./style.css";
import defaulPhoto from "./photo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { env_map } from "../../env";

function ImageUpload(props) {
    const [image, setImage] = useState(null);
    const hiddenFileInput = useRef(null);
    const [fileImage, setFileImage] = useState(null);
    const [url, setUrl] = useState("")
    const MAIN_API_SERVICE_URL = env_map.MAIN_API_SERVICE_URL;
    console.log("ENV: ", env_map.MAIN_API_SERVICE_URL)
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
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return
        console.log("File", file);
        setFileImage(file)

        console.log("Upload Image")
        // handleUploadButtonClick(fileImage)
        const imgname = event.target.files[0].name;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxSize = Math.max(img.width, img.height);
                canvas.width = maxSize;
                canvas.height = maxSize;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                    img,
                    (maxSize - img.width) / 2,
                    (maxSize - img.height) / 2
                );
                canvas.toBlob(
                    (blob) => {
                        const file = new File([blob], imgname, {
                            type: "image/png",
                            lastModified: Date.now(),
                        });

                        console.log(file);

                        setImage(file);
                    },
                    "image/jpeg",
                    0.8
                );
            };
        };

    };

    const handleUploadButtonClick = (file) => {
        if (!file) return
        console.log(file);

        const formdata = new FormData();
        formdata.append("file", file);

        fetch(MAIN_API_SERVICE_URL + "/upload/profile_pic", {
            method: "POST",
            body: formdata,
        })
            .then((response) => response.text())
            .then((result) => {
                toast.success('Upload image successfully!', defaultToastStyle);
                console.log("Upload Image Response: ", JSON.parse(result));
                const profileurl = JSON.parse(result);
                props.setImageUrl(profileurl.img_url)
                setUrl(profileurl.img_url)
            })
            .catch((error) => toast.error('Failed to upload image!', defaultToastStyle));
    };

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    return (
        <div>
            <div className="image-upload-container">
                <div className="box-decoration">
                    <label htmlFor="image-upload-input" className="image-upload-label">
                        {image ? "Choose another image" : "Choose an image"}
                    </label>
                    <div onClick={handleClick} style={{ cursor: "pointer" }}>
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after" />
                        ) : (
                            <img src={defaulPhoto} alt="upload image" className="img-display-before" />
                        )}

                        <input
                            id="image-upload-input"
                            type="file"
                            onChange={handleImageChange}
                            ref={hiddenFileInput}
                            style={{ display: "none" }}
                        />
                    </div>

                    <button
                        className="image-upload-button"
                        onClick={() => handleUploadButtonClick(fileImage)}
                    >
                        Upload
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ImageUpload;