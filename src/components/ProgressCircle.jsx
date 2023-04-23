import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState } from "react";

const angleInterval = (angle, setAngle, actualProgress) => {
  var anotherAngle = angle;
  var angleProcess = setInterval(function () {
    setAngle(angle => angle + 3)
    anotherAngle = anotherAngle + 3;
    if (anotherAngle > parseInt(actualProgress)) {
      clearInterval(angleProcess);
    }
  }, 1);
}


const ProgressCircle = ({ progress = "0.75", size = "60" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const actualProgress = Math.floor(progress * 360);
  const [angle, setAngle] = useState(1);
  const [angleIntervalIsStarted, setAngleIntervalIsStarted] = useState(false);

  if (angleIntervalIsStarted === false) {
    console.log("Angle: " + angle)
    console.log("actualProcess: " + actualProgress)
    setAngleIntervalIsStarted(true);
    angleInterval(angle, setAngle, actualProgress);
  }

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
