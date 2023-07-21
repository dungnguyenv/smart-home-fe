import { Box, Button, IconButton, Typography, useTheme, Switch } from "@mui/material";
import { tokens } from "../../theme";
import { mockHistories } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import TvIcon from '@mui/icons-material/Tv';
import DoorFrontTwoToneIcon from '@mui/icons-material/DoorFrontTwoTone';
import BlindsTwoToneIcon from '@mui/icons-material/BlindsTwoTone';
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import React, { useState, useEffect } from "react";
import { blue } from "@mui/material/colors";
import Slider from '@mui/material/Slider';
import { CirclePicker } from 'react-color';
import { database, writeDataToPath, sendLog } from "../../firebase/FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import ToggleSwitch from "../../components/toggle-switch/ToggleSwitch";
const marks = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 37,
        label: '37°C',
    },
    {
        value: 100,
        label: '100°C',
    },
];

const marksKitStove = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 100,
        label: '100°C',
    },
    {
        value: 150,
        label: '150°C',
    },
    {
        value: 250,
        label: '250°C',
    },
];

const markPercents = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 20,
        label: '20%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 100,
        label: '100%',
    },
];
function valuetext(value) {
    return `${value}°C`;
}

function valuePercent(value) {
    return `${value}%`;
}

function formatRgb(rgb) {
    return "r" + rgb.r + "g" + rgb.g + "b" + rgb.b;
}

const default_rgb_led = {
    value: 0,
    time: 2373828328,
    rgb_value: "r16g15b125",
    rgb_hex_value: "#f44336",
    rgb: {
        r: 123,
        g: 145,
        b: 224
    }
}


const OtherDevices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [livLed1, setLivLed1] = useState(default_rgb_led)
    const [livLed1Value, setLivLed1Value] = useState(20)
    const [livLed2, setLivLed2] = useState(default_rgb_led)
    const [livCurtain, setLivCurtain] = useState({ value: 15, status: 1, time: 12312312313 })
    const [bedLed, setBedLed] = useState({ value: 20, status: 1, time: 12312312 })
    const [value, setValue] = React.useState(dayjs(new Date()));


    const [bathHeater, setBathHeater] = useState({})
    const [bathHeaterDate, setBathHeaterDate] = useState({ fromDate: (new Date()).getTime(), toDate: (new Date()).getTime() })
    const [kitStove, setKitStove] = useState({})
    const [kitStoveDate, setKitStoveDate] = useState({ fromDate: (new Date()).getTime(), toDate: (new Date()).getTime() })

    const updateBathHeater = (value) => {
        writeDataToPath("/smart-home/living-room/devices/bath-heater", value)
    }

    const updateKitStove = (value) => {
        writeDataToPath("/smart-home/living-room/devices/kit-stove", value)
    }


    function timestampToFormattedString(timestamp) {
        console.log(timestamp)
        const date = new Date(timestamp);
        console.log("Date: ", date)

        // Get the date components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');

        // Get the time components
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Combine the date and time components into the desired format
        const formattedString = `${year}-${month}-${day}T${hours}:${minutes}`;

        return formattedString;
    }

    useEffect(() => {
        onValue(ref(database, '/smart-home/living-room/devices'), (snapshot) => {
            // Convert the object to an array of object
            setBathHeater(snapshot.val()['bath-heater'])
            setKitStove(snapshot.val()['kit-stove'])
            console.log(bathHeater['time-on'])
        }, {
            onlyOnce: false
        });
    }, [])


    return (
        <div>
            <Box m="20px">
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center" >
                    <Header title="Bath Room" subtitle="Have a good day" />
                </Box>


                {/* ROW 3 */}
                <Box display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={"10px"}
                    gap="20px"
                >
                    <Box
                        gridColumn="span 5"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        p="30px"
                    >
                        <Typography variant="h5" fontWeight="600" style={{ color: livLed1.hex }}>
                            Bath Heater
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            mt="25px"
                        >


                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                    <DateTimePicker
                                        label="From Date Time"
                                        value={dayjs(timestampToFormattedString(bathHeater['time-on']))}
                                        onChange={(newValue) => {
                                            let bathHeaterDateTemp = { ...bathHeaterDate }
                                            bathHeaterDateTemp.fromDate = (new Date(newValue)).getTime()
                                            setBathHeaterDate(bathHeaterDateTemp)
                                            console.log("From Date: ", newValue)
                                        }}
                                        onAccept={() => {
                                            console.log("accepted!")
                                        }}
                                    />
                                    <DateTimePicker
                                        label="To Date Time"
                                        value={dayjs(timestampToFormattedString(bathHeater['time-off']))}
                                        onChange={(newValue) => {
                                            let bathHeaterDateTemp = { ...bathHeaterDate }
                                            bathHeaterDateTemp.toDate = (new Date(newValue)).getTime()
                                            setBathHeaterDate(bathHeaterDateTemp)
                                            console.log("To Date: ", newValue)
                                        }}
                                        onAccept={() => {
                                            console.log("accepted!")
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <Box>
                                <Button
                                    sx={{
                                        backgroundColor: colors.blueAccent[700],
                                        color: colors.grey[100],
                                        fontSize: "10px",
                                        fontWeight: "bold",
                                        padding: "7px 10px",
                                        borderRadius: "20px",
                                        marginTop: 1
                                    }}
                                    onClick={() => {
                                        let bathHeaterTemp = { ...bathHeater }
                                        bathHeaterTemp['time-on'] = bathHeaterDate.fromDate;
                                        bathHeaterTemp['time-off'] = bathHeaterDate.toDate;
                                        bathHeaterTemp.auto = 1;

                                        updateBathHeater(bathHeaterTemp)

                                    }}
                                >
                                    Setup
                                </Button>
                            </Box>

                            <div style={{ marginTop: 20 }}>

                            </div>

                            <ProgressCircle progress={bathHeater.temperature / 100} size="150" />

                            <Slider
                                aria-label="Volume"
                                // defaultValue={90.2}
                                getAriaValueText={valuePercent}
                                step={10}
                                marks={marks}
                                valueLabelDisplay="auto"
                                value={bathHeater.temperature}
                                onChange={(event, newValue) => {
                                    let bathHeaterTemp = { ...bathHeater };
                                    bathHeaterTemp.temperature = newValue;
                                    // setLivLed1(livLed1Tmp)

                                    updateBathHeater(bathHeaterTemp)
                                }}

                            />

                            <Typography
                                variant="h5"
                                color={colors.greenAccent[500]}
                                sx={{ mt: "15px" }}
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20
                                }}
                            >
                                Temperature: {'20'}
                            </Typography>

                            <ToggleSwitch
                                isChecked={bathHeater.status}
                                onClick={() => {
                                    let bathHeaterTemp = { ...bathHeater }
                                    bathHeaterTemp.status = bathHeater.status ? 0 : 1;
                                    updateBathHeater(bathHeaterTemp)
                                }}
                            />
                        </Box>
                    </Box>

                    <Box
                        gridColumn="span 5"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        p="30px"
                    >
                        <Typography variant="h5" fontWeight="600" style={{ color: livLed1.hex }}>
                            Kit Stove
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            mt="25px"
                        >


                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                    <DateTimePicker
                                        label="From Date Time"
                                        value={dayjs(timestampToFormattedString(kitStove['time-on']))}
                                        onChange={(newValue) => {
                                            let bathHeaterDateTemp = { ...kitStoveDate }
                                            bathHeaterDateTemp.fromDate = (new Date(newValue)).getTime()
                                            setBathHeaterDate(bathHeaterDateTemp)
                                            console.log("From Date: ", newValue)
                                        }}
                                        onAccept={() => {
                                            console.log("accepted!")
                                        }}
                                    />
                                    <DateTimePicker
                                        label="To Date Time"
                                        value={dayjs(timestampToFormattedString(kitStove['time-off']))}
                                        onChange={(newValue) => {
                                            let bathHeaterDateTemp = { ...kitStoveDate }
                                            bathHeaterDateTemp.toDate = (new Date(newValue)).getTime()
                                            setBathHeaterDate(bathHeaterDateTemp)
                                            console.log("To Date: ", newValue)
                                        }}
                                        onAccept={() => {
                                            console.log("accepted!")
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                            <Box>
                                <Button
                                    sx={{
                                        backgroundColor: colors.blueAccent[700],
                                        color: colors.grey[100],
                                        fontSize: "10px",
                                        fontWeight: "bold",
                                        padding: "7px 10px",
                                        borderRadius: "20px",
                                        marginTop: 1
                                    }}
                                    onClick={() => {
                                        let bathHeaterTemp = { ...kitStove }
                                        bathHeaterTemp['time-on'] = kitStoveDate.fromDate;
                                        bathHeaterTemp['time-off'] = kitStoveDate.toDate;
                                        bathHeaterTemp.auto = 1;

                                        updateKitStove(bathHeaterTemp)

                                    }}
                                >
                                    Setup
                                </Button>
                            </Box>

                            <div style={{ marginTop: 20 }}>

                            </div>

                            <ProgressCircle progress={kitStove.temperature / 250} size="150" />

                            <Slider
                                aria-label="Volume"
                                // defaultValue={90.2}
                                getAriaValueText={valuePercent}
                                step={10}
                                max={250}
                                marks={marksKitStove}
                                valueLabelDisplay="auto"
                                value={kitStove.temperature}
                                onChange={(event, newValue) => {
                                    let bathHeaterTemp = { ...bathHeater };
                                    // bathHeaterTemp.temperature = (newValue / 100) * 250;
                                    bathHeaterTemp.temperature = newValue;
                                    // setLivLed1(livLed1Tmp)

                                    updateKitStove(bathHeaterTemp)
                                }}

                            />

                            <Typography
                                variant="h5"
                                color={colors.greenAccent[500]}
                                sx={{ mt: "15px" }}
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20
                                }}
                            >
                                Temperature: {'20'}
                            </Typography>

                            <ToggleSwitch
                                isChecked={kitStove.status}
                                onClick={() => {
                                    let bathHeaterTemp = { ...kitStove }
                                    bathHeaterTemp.status = kitStove.status ? 0 : 1;
                                    updateKitStove(bathHeaterTemp)
                                }}
                            />
                        </Box>
                    </Box>





                </Box>
            </Box>



        </div >
    );
};



export default OtherDevices;
