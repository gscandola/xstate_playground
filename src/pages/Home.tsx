import { Box } from "@gemini/core";
import { Button } from "@gemini/ui";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box padding="spacing.32">
      <Box
        padding="spacing.8"
        borderRadius="radius.8"
        borderColor="color.surface.brand.primary.default"
        borderStyle="solid"
        borderWidth="borderWidth.1"
      >
        <Box>
          <Box as="h1" typography="typography.headline.22.bold">
            🍨 Ice Cream machine
          </Box>
          <Box as="p">
            Create an ice cream through a state machine. Alongside the use of XState it implements child stated & delay.
          </Box>
        </Box>
        <Button href="/ice-cream" size="40">
          Go to machine
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
