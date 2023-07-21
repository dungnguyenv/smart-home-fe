
import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { formatDateToString, formatFloat } from '../../firebase/CommonFunction';
import { database, writeDataToPath, sendLog } from "../../firebase/FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import "./loading-progress.css"
import { env_map } from '../../env';
const options = ['Camera 01', 'Camera 02', 'Camera 03'];
const cameraMap = [
    "living_camera",
    "bad_room_camera"
]

export default function SplitButton() {
    const MAIN_API_SERVICE_URL = env_map.MAIN_API_SERVICE_URL;
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [cameraLog, setCameraLog] = React.useState([{
        'username': "null",
        "image-url": "null",
        "fullName": "null",
        "time": 0
    }])
    const baseCameraUrl = MAIN_API_SERVICE_URL.concat('/video_feed/');
    const defaultCamera = 'living_camera'
    const [cameraUrl, setCameraUrl] = React.useState(baseCameraUrl + defaultCamera);
    const [switchCamera, setSwitchCamera] = React.useState(false)

    const [imageUri, setImageUri] = useState("");
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    useEffect(() => {
        fetchImage();
    }, []);

    const fetchImage = async () => {
        try {
            console.log("fetch image")
            const response = await fetch('http://127.0.0.1:5000/video_feed/living_camera');
            const reader = response.body.getReader();

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                // Convert the received data into a blob
                const blob = new Blob([value], { type: 'image/jpeg' });

                // Convert the blob into a data URL
                //   const dataURL = URL.createObjectURL(blob);
                const uri = URL.createObjectURL(blob);

                setImageUri(uri);
            }
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        onValue(ref(database, '/smart-home/logs/camera'), (snapshot) => {
            console.log(snapshot.val())
            // Convert the object to an array of objects
            const dataArray = Object.values(snapshot.val());
            // Sort the array in descending order based on the "time" property
            dataArray.sort((a, b) => b.time - a.time);

            console.log(dataArray);
            console.log("ARRAY: ", dataArray)
            console.log("SLICE: ", dataArray.slice(0, 10))
            setCameraLog(dataArray.slice(0, 30))
        }, {
            onlyOnce: false
        });
    }, [])

    const switchCameraIndex = (camera_index) => {
        console.log('Switch camera: ', baseCameraUrl + cameraMap[camera_index])
        setSwitchCamera(true)
        const randomParam = Math.random().toString(36).substring(7);
        setCameraUrl(baseCameraUrl + cameraMap[camera_index] + '?cache=' + randomParam)
        setSwitchCamera(false)
    }


    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
        setSwitchCamera(!switchCamera)
        setCameraUrl(baseCameraUrl + cameraMap[selectedIndex])
    };

    const handleMenuItemClick = (event, index) => {
        console.log(`You select ${index}`)

        switchCameraIndex(index);
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <div style={{ marginLeft: "10px", display: "flex", flexDirection: "row" }}>
            <div>
                <React.Fragment>
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                        <Button
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    <Popper
                        sx={{
                            zIndex: 1,
                        }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </React.Fragment>
                <div style={{ width: '90vh', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        !switchCamera ?
                            <div style={{ marginTop: "10px", borderRadius: "10px", width: '500px' }}>
                                <img src={imageUri} width="150%"
                                    style={{ borderRadius: "10px" }} />
                                {/* <img src="https://d5cd-58-186-64-208.ngrok-free.app/video_feed" width="125%"
                        style={{ borderRadius: "10px" }} /> */}
                            </div>
                            : <div class="lds-spinner" ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    }
                </div>
            </div>
            <div>
                <ImageList sx={{ width: "370px", height: 625, marginLeft: "20%", marginTop: "10px", borderRadius: "10px" }} cols={1}>
                    <ImageListItem key="Subheader" cols={1}>
                        <ListSubheader component="div">Face Recognition</ListSubheader>
                    </ImageListItem>
                    {cameraLog.map((item) => (
                        <ImageListItem key={item['image-url']}>
                            <img
                                src={`${item['image-url']}?w=248&fit=crop&auto=format`}
                                srcSet={`${item['image-url']}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.username}
                                loading="lazy"
                                style={{ width: '350px' }}
                            />
                            <ImageListItemBar
                                title={item.fullName + " - " + item.username}
                                subtitle={formatDateToString(new Date(item.time)) + ' - ' + formatFloat(item.confidence) + '%'}

                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.fullName}`}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </div>
    );
}


