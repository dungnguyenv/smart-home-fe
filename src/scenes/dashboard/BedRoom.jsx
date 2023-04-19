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
import Slider from '@mui/material/Slider';

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

function valuetext(value) {
  return `${value}°C`;
}

const BedRoom = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


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
                  defaultValue={40}
                  getAriaValueText={valuetext}
                  step={10}
                  marks={marks}
                  valueLabelDisplay="on"
                />
                <Typography variant="h5" fontWeight="600" marginTop={"20px"}>
                  Temperature
                </Typography>
              </Box>

              <Box sx={{ width: 300 }} marginLeft={"100px"}>
                <ProgressCircle
                  progress={"0.8"}
                  size={"90"}
                />

                <Typography variant="h5" fontWeight="600" marginTop={"10px"}>
                  Humidity
                </Typography>
              </Box>
            </Box>
          </Box>



        </Box>




      </Box>

    </div >
  );
};

export default BedRoom;
