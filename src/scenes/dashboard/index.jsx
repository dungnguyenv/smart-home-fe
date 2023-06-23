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
import React, { useEffect, useState } from "react";
import { blue } from "@mui/material/colors";
import { database, writeDataToPath, sendLog } from "../../firebase/FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";
import { chatGPTRequest } from "../../openai/ChatGPT";
import { getTimeOn, formatDateToString } from "../../firebase/CommonFunction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = ({ authentication }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [histories, setHistories] = useState([])
  const [smartTv, setSmartTv] = useState({});
  const [firstLight, setFirstLight] = useState({});
  const [secondLight, setSecondLight] = useState({});
  const [door, setDoor] = useState({});
  const [curtains, setCurtains] = useState({});

  const [dht11, setDht11] = useState({
    "temperature": {
      "value": null
    },
    "humidity": {
      "value": null
    }
  });


  useEffect(() => {
    onValue(ref(database, '/smart-home/living-room/devices'), (snapshot) => {
      //   const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';\
      console.log("Data: " + JSON.stringify(snapshot.val()))
      console.log("Smart TV: status " + snapshot.val()['tv']['status'])
      setSmartTv({
        "status": snapshot.val()['tv']['status'],
        "statusName": snapshot.val()['tv']['status'] == 1 ? "ON" : "OFF",
        "timeOn": getTimeOn(snapshot.val()['tv']['time-on'])
      })

      setFirstLight({
        "status": snapshot.val()['light1']['status'],
        "statusName": snapshot.val()['light1']['status'] == 1 ? "ON" : "OFF",
        "timeOn": getTimeOn(snapshot.val()['light1']['time-on'])
      })

      setSecondLight({
        "status": snapshot.val()['light2']['status'],
        "statusName": snapshot.val()['light2']['status'] == 1 ? "ON" : "OFF",
        "timeOn": getTimeOn(snapshot.val()['light2']['time-on'])
      })

      setDoor({
        "status": snapshot.val()['door']['status'],
        "statusName": snapshot.val()['door']['status'] == 1 ? "ON" : "OFF",
        "timeOn": getTimeOn(snapshot.val()['door']['time-on'])
      })

      setCurtains({
        "status": snapshot.val()['curtains']['status'],
        "statusName": snapshot.val()['curtains']['status'] == 1 ? "ON" : "OFF",
        "timeOn": getTimeOn(snapshot.val()['curtains']['time-on'])
      })
    }, {
      onlyOnce: false
    });

    onValue(ref(database, '/smart-home/living-room/sensors'), (snapshot) => {
      console.log(snapshot.val())
      // Convert the object to an array of objects
      setDht11(snapshot.val()["dht11"])
    }, {
      onlyOnce: false
    });

    onValue(ref(database, '/smart-home/logs'), (snapshot) => {
      console.log(snapshot.val())
      // Convert the object to an array of objects
      const dataArray = Object.values(snapshot.val().content);
      // Sort the array in descending order based on the "time" property
      dataArray.sort((a, b) => b.time - a.time);

      console.log(dataArray);
      setHistories(dataArray.slice(0, 100))
    }, {
      onlyOnce: false
    });
  }, [])


  return (
    <div>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="LIVING ROOM" subtitle="Welcome to your Smart Home" />

          <Box >
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
          </Box>
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
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

            <StatBox
              title="Smart TV"
              subtitle={"Status: " + smartTv.statusName}
              progress={(smartTv.status == 1 ? smartTv.timeOn : 0)}
              increase={"Time: " + (smartTv.status == 1 ? smartTv.timeOn : 0) + "h"}
              icon={
                <TvIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                />
              }
            />
            <Switch
              checked={smartTv.status}
              onClick={() => {
                writeDataToPath("/smart-home/living-room/devices/tv", {
                  "status": smartTv.status == 1 ? 0 : 1,
                  "time-on": smartTv.status == 1 ? 0 : (new Date()).getTime()
                })
                sendLog({
                  "action": smartTv.status == 1 ? "Turn off living room TV" : "Turn on living room TV",
                  "time": (new Date).getTime(),
                  "user-id": authentication.user.id,
                  "user-full-name": authentication.user["fullName"]
                })
              }}
            >

            </Switch>
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Light"
              subtitle={"Status: " + firstLight.statusName}
              progress={(firstLight.status == 1 ? firstLight.timeOn : 0)}
              increase={"Time: " + (firstLight.status == 1 ? firstLight.timeOn : 0) + "h"}
              icon={
                <LightModeTwoToneIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                />
              }
            />
            <Switch
              checked={firstLight.status}

              onClick={() => {
                writeDataToPath("/smart-home/living-room/devices/light1", {
                  "status": firstLight.status == 1 ? 0 : 1,
                  "time-on": firstLight.status == 1 ? 0 : (new Date()).getTime()
                })
                sendLog({
                  "action": firstLight.status == 1 ? "Turn off living room light" : "Turn on living room light",
                  "time": (new Date).getTime(),
                  "user-id": authentication.user.id,
                  "user-full-name": authentication.user["fullName"]
                })
              }}
            >
            </Switch>
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Door"
              subtitle={"Status: " + door.statusName}
              progress={(door.status == 1 ? door.timeOn : 0)}
              increase={"Time: " + (door.status == 1 ? door.timeOn : 0) + "h"}
              icon={
                <DoorFrontTwoToneIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                />
              }
            />
            <Switch
              checked={door.status}

              onClick={() => {
                writeDataToPath("/smart-home/living-room/devices/door", {
                  "status": door.status == 1 ? 0 : 1,
                  "time-on": door.status == 1 ? 0 : (new Date()).getTime()
                })
                sendLog({
                  "action": door.status == 1 ? "Close living room door" : "Open living room door",
                  "time": (new Date).getTime(),
                  "user-id": authentication.user.id,
                  "user-full-name": authentication.user["fullName"]
                })
              }}
            ></Switch>
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="Curtains"
              subtitle={"Status: " + curtains.statusName}
              progress={(curtains.status == 1 ? curtains.timeOn : 0)}
              increase={"Time: " + (curtains.status == 1 ? curtains.timeOn : 0) + "h"}
              icon={
                <BlindsTwoToneIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                />
              }
            />
            <Switch
              checked={curtains.status}

              onClick={() => {
                writeDataToPath("/smart-home/living-room/devices/curtains", {
                  "status": curtains.status == 1 ? 0 : 1,
                  "time-on": curtains.status == 1 ? 0 : (new Date()).getTime()
                })
                sendLog({
                  "action": curtains.status == 1 ? "Close living room curtains" : "Open living room curtains",
                  "time": (new Date).getTime(),
                  "user-id": authentication.user.id,
                  "user-full-name": authentication.user["fullName"]
                })
              }}
            ></Switch>
          </Box>

          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Temperature Line Chart
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  Now: {dht11.temperature.value} &#176;C
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 4"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Histories
              </Typography>
            </Box>
            {histories.map((history, i) => (
              <Box
                key={`${history.time}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {formatDateToString(new Date(history.time))}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {history["user-full-name"]}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{history.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {history.action}
                </Box>
              </Box>
            ))}
          </Box>

          {/* ROW 3 */}
          <Box
            gridColumn="span 4"
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
              <ProgressCircle progress={dht11.humidity.value / 100} size="125" />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                {dht11.humidity.value}%
              </Typography>
              <Typography>Humidity is measured in the room</Typography>
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Rainfall Chart
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
          {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            padding="30px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
            >
              Geography Based Traffic
            </Typography>
            <Box height="200px">
              <GeographyChart isDashboard={true} />
            </Box>
          </Box> */}
        </Box>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
