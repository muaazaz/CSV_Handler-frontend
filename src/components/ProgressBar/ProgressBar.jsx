import * as React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";

const ProgressBar = ({ progress }) => {
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
    width: "31.25rem",
    backgroundColor: "white",
  }));
  return (
    <BorderLinearProgress
      variant="determinate"
      value={progress}
      color="secondary"
    />
  );
};

export default ProgressBar;
