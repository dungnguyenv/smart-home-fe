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
import React, { useState } from "react";
import { blue } from "@mui/material/colors";

const Dashboard = ({ authentication }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [smartTv, setSmartTv] = useState({
    "status": true,
    "statusName": "ON",
    "timeOn": 2.1
  })

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
              progress="0.75"
              increase={"Time: " + smartTv.timeOn}
              icon={
                <TvIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                />
              }
            />
            <Switch
              checked={smartTv.status}
              defaultChecked
              onClick={() => {
                setSmartTv({
                  "status": !smartTv.status,
                  "statusName": smartTv.status ? "OFF" : "ON",
                  "timeOn": smartTv.status ? 0 : 2.1
                })
              }}
            >
              {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}

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
              subtitle="Status: ON"
              progress="0.50"
              increase="Time: 3.5h"
              icon={
                <LightModeTwoToneIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                />
              }
            />
            <Switch
              checked={smartTv.status}
              defaultChecked
              onClick={() => {
                setSmartTv({
                  "status": !smartTv.status,
                  "statusName": smartTv.status ? "OFF" : "ON",
                  "timeOn": smartTv.status ? 0 : 2.1
                })
              }}
            >
              {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}

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
              subtitle="Status: ON"
              progress="0.30"
              increase=""
              icon={
                <DoorFrontTwoToneIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                />
              }
            />
            <Switch
              checked={smartTv.status}
              defaultChecked
              onClick={() => {
                setSmartTv({
                  "status": !smartTv.status,
                  "statusName": smartTv.status ? "OFF" : "ON",
                  "timeOn": smartTv.status ? 0 : 2.1
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
              subtitle="Status: ON"
              progress="0.80"
              increase="Time: 3.2h"
              icon={
                <BlindsTwoToneIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
                />
              }
            />
            <Switch
              checked={smartTv.status}
              defaultChecked
              onClick={() => {
                setSmartTv({
                  "status": !smartTv.status,
                  "statusName": smartTv.status ? "OFF" : "ON",
                  "timeOn": smartTv.status ? 0 : 2.1
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
                  Now: 39.5 &#176;C
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
            {mockHistories.map((history, i) => (
              <Box
                key={`${history.txId}-${i}`}
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
                    {history.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {history.user}
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
              <ProgressCircle progress="0.8015" size="125" />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                80.15%
              </Typography>
              <Typography>Includes extra misc expenditures and costs</Typography>
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
              Sales Quantity
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
    </div>
  );
};

export default Dashboard;
