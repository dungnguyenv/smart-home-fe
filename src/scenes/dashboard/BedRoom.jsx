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

const BedRoom = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [livLed1, setLivLed1] = useState(default_rgb_led)
  const [livLed1Value, setLivLed1Value] = useState(20)
  const [livLed2, setLivLed2] = useState(default_rgb_led)
  const [livCurtain, setLivCurtain] = useState({ value: 15, status: 1, time: 12312312313 })
  const [bedLed, setBedLed] = useState({ value: 20, status: 1, time: 12312312 })

  useEffect(() => {
    onValue(ref(database, '/smart-home/living-room/devices'), (snapshot) => {
      // Convert the object to an array of objects
      setLivLed1(snapshot.val()['liv-led-1'])
      setLivLed2(snapshot.val()['liv-led-2'])
      setBedLed(snapshot.val()['bed-led'])
      setLivCurtain(snapshot.val()['liv-curtain'])
    }, {
      onlyOnce: false
    });
  }, [])


  return (
    <div>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center" >
          <Header title="BED ROOM" subtitle="Have a good day" />

          {/* <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={() => { alert("You have just clicked me!") }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box> */}
        </Box>

        <Box >
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >


              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="Always visible"
                  // defaultValue={90.2}
                  getAriaValueText={valuetext}
                  step={10}
                  marks={marks}
                  valueLabelDisplay="on"
                  value={38.5}
                />
                <Typography variant="h5" fontWeight="600" marginTop={"20px"}>
                  Temperature: {38.5} &#176;C
                </Typography>
              </Box>

              <Box sx={{ width: 300 }} marginLeft={"100px"}>
                <ProgressCircle
                  progress={"0.8"}
                  size={"90"}
                />

                <Typography variant="h5" fontWeight="600" marginTop={"10px"}>
                  Humidity: {80} %
                </Typography>
              </Box>
            </Box>
          </Box>



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
              Liv Led 1
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              {/* <ProgressCircle progress="0.8015" size="125" /> */}
              <CirclePicker
                onChange={(color, event) => {
                  let livLed1Tmp = { ...livLed1 };
                  livLed1Tmp.rgb = color.rgb;
                  livLed1Tmp.rgb_value = formatRgb(color.rgb)
                  livLed1Tmp.rgb_hex_value = color.hex;
                  // setLivLed1(livLed1Tmp)
                  writeDataToPath("/smart-home/living-room/devices/liv-led-1", livLed1Tmp);
                }}
              />
              <Slider
                aria-label="Volume"
                // defaultValue={90.2}
                getAriaValueText={valuePercent}
                step={10}
                marks={markPercents}
                valueLabelDisplay="auto"
                value={livLed1.value}
                onChange={(event, newValue) => {
                  let livLed1Tmp = { ...livLed1 };
                  livLed1Tmp.value = newValue;
                  // setLivLed1(livLed1Tmp)

                  writeDataToPath("/smart-home/living-room/devices/liv-led-1", livLed1Tmp);
                }}
              />

              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
                style={{
                  color: livLed1.rgb_hex_value,
                  fontWeight: 'bold'
                }}
              >
                RGB ( {livLed1['rgb']['r']}, {livLed1['rgb']['g']}, {livLed1['rgb']['b']})
              </Typography>
              {/* <Typography>Includes extra misc expenditures and costs</Typography> */}
            </Box>
          </Box>
          <Box
            gridColumn="span 5"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Liv Led 2
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              {/* <ProgressCircle progress="0.8015" size="125" /> */}
              <CirclePicker
                onChange={(color, event) => {
                  console.log(color);
                  let livLed1Tmp = { ...livLed2 };
                  livLed1Tmp.rgb = color.rgb;
                  livLed1Tmp.rgb_value = formatRgb(color.rgb)
                  livLed1Tmp.rgb_hex_value = color.hex;
                  // setLivLed2(livLed1Tmp)
                  writeDataToPath("/smart-home/living-room/devices/liv-led-2", livLed1Tmp);
                }}
              />
              <Slider
                aria-label="Volume"
                // defaultValue={90.2}
                getAriaValueText={valuePercent}
                step={10}
                marks={markPercents}
                valueLabelDisplay="auto"
                value={livLed2.value}
                onChange={(event, newValue) => {
                  let livLed1Tmp = { ...livLed2 };
                  livLed1Tmp.value = newValue;
                  // setLivLed2(livLed1Tmp)

                  writeDataToPath("/smart-home/living-room/devices/liv-led-2", livLed1Tmp);
                }}
              />

              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
                style={{ color: livLed2.rgb_hex_value, fontWeight: "bold" }}
              >
                RGB ( {livLed2['rgb']['r']}, {livLed2['rgb']['g']}, {livLed2['rgb']['b']})
              </Typography>
              {/* <Typography>Includes extra misc expenditures and costs</Typography> */}
            </Box>
          </Box>

          <Box
            gridColumn="span 5"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Liv curtain
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle progress={livCurtain.value / 100} size="112" />
              <Slider
                aria-label="Volume"
                // defaultValue={90.2}
                getAriaValueText={valuePercent}
                step={10}
                marks={markPercents}
                valueLabelDisplay="auto"
                value={livCurtain.value}
                onChange={(event, newValue) => {
                  let livCurtainTemp = { ...livCurtain };
                  livCurtainTemp.value = newValue;
                  livCurtainTemp.time = (new Date()).getTime()

                  // setLivCurtain(livCurtainTemp)
                  writeDataToPath("/smart-home/living-room/devices/liv-curtain", livCurtainTemp);
                }}
              />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                Open: {livCurtain.value}%
              </Typography>
              {/* <Typography>Includes extra misc expenditures and costs</Typography> */}
            </Box>
          </Box>

          <Box
            gridColumn="span 5"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Bed Led
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle progress={bedLed.value / 100} size="112" />
              <Slider
                aria-label="Volume"
                // defaultValue={90.2}
                getAriaValueText={valuePercent}
                step={10}
                marks={markPercents}
                valueLabelDisplay="auto"
                value={bedLed.value}
                onChange={(event, newValue) => {
                  let bedLedTemp = { ...bedLed }
                  bedLedTemp.value = newValue
                  bedLedTemp.time = (new Date()).getTime()

                  // setBedLed(bedLedTemp)
                  writeDataToPath("/smart-home/living-room/devices/bed-led", bedLedTemp);
                }}
              />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                Brightness: {bedLed.value}%
              </Typography>
              {/* <Typography>Includes extra misc expenditures and costs</Typography> */}
            </Box>
          </Box>
          <Box
            gridColumn="span 5"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Humidity
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle progress="0.8015" size="112" />
              <Slider
                aria-label="Volume"
                // defaultValue={90.2}
                getAriaValueText={valuePercent}
                step={10}
                marks={markPercents}
                valueLabelDisplay="auto"
                value={livLed1Value}
                onChange={(event, newValue) => {
                  setLivLed1(livLed1 => {
                    let led1 = livLed1;
                    led1.value = newValue;
                    return led1;
                  })

                  setLivLed1Value(newValue)
                  writeDataToPath("/smart-home/living-room/devices/liv-led-1", livLed1);
                }}
              />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                80.15%
              </Typography>
              {/* <Typography>Includes extra misc expenditures and costs</Typography> */}
            </Box>
          </Box>
          {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Sales Quantity
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box> */}

        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          marginTop={"10px"}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>




      </Box>

    </div >
  );
};

export default BedRoom;
