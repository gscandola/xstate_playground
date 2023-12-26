import { Box } from "@gemini/core";
import React from "react";
import { StateFrom } from "xstate";
import IceCreamMachine from "@/machines/IceCreamMachine/machine";

const getStateLabel = (state: StateFrom<typeof IceCreamMachine>) => {
  if (state.matches("idle")) return "Idle";

  if (state.matches({ define: "container" }))
    return "Waiting for container selection";

  if (state.matches({ define: "scoop" })) return "Waiting for scoop selection";

  if (state.matches("make")) return "Making ice cream...";

  return "";
};

const StateDisplay = ({
  state,
}: {
  state: StateFrom<typeof IceCreamMachine>;
}) => {
  return (
    <Box
      width="500px"
      height="200px"
      backgroundColor="color.surface.light.default"
      borderColor="color.surface.brand.primary.default"
      borderWidth="borderWidth.1"
      borderStyle="dashed"
      padding="spacing.8"
      typography="typography.display.36.regular"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {getStateLabel(state)}
    </Box>
  );
};

export default StateDisplay;
