import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useEffect, useState } from "react";

const ProgressCircle = ({ progress = "0.75", size = "60" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    var actualProgress = Math.floor(progress * 360);
    setAngle(0);
    var anotherAngle = 0;
    if (actualProgress > 0) {
      var angleProcess = setInterval(function () {
        setAngle(angle => angle + 3)
        anotherAngle = anotherAngle + 3;
        if (anotherAngle > parseInt(actualProgress)) {
          clearInterval(angleProcess);
        }
      }, 1);
    }

  }, [progress])

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
