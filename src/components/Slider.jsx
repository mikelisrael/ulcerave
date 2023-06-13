/* This is a React component that renders a slider with customized styles using the Material-UI
library. The component takes a prop `handleSliderChange` which is a function that will be called
when the slider value changes and is committed by the user. The slider is wrapped in a `Box`
component with custom styles for width, height, background color, padding, border, and display. The
slider itself has custom styles for the thumb, value label, and color. The `defaultValue` prop is
set to 0 and the `valueLabelDisplay` prop is set to "on" to display the current value of the slider. */
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function SliderSizes({ handleSliderChange }) {
  return (
    <Box
      sx={{
        width: window.innerWidth < 768 ? 230 : 500,
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
        onChangeCommitted={handleSliderChange}
      />
    </Box>
  );
}
