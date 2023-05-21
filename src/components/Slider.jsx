import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function SliderSizes() {
  return (
    <Box
      sx={{
        width: window.innerWidth < 768 ? 300 : 500,
        height: window.innerWidth < 768 ? 40 : 48,
        backgroundColor: "#f6f6f6",
        padding: 0,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        border: "10px solid white",
      }}
    >
      <Slider
        sx={{
          color: "#f6f6f6",
          "& .MuiSlider-thumb": {
            backgroundColor: "white",
            width: 24,
            height: 24,
            marginLeft: 2,
          },
          "& .MuiSlider-valueLabel": {
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            backgroundColor: "white",
            borderRadius: 8,
            color: "#808080",
          },
        }}
        size="medium"
        defaultValue={0}
        aria-label="Small"
        valueLabelDisplay="on"
      />
    </Box>
  );
}
