import MachineCard from "@/components/MachineCard";
import { Box } from "@gemini/core";

const Home = () => {
  return (
    <Box padding="spacing.32">
      <MachineCard
        title="🍨 Ice Cream machine"
        description="Create an ice cream through a state machine. Alongside the use of XState it implements child stated & delay."
        route="/ice-cream"
      />

      <MachineCard
        title="🌤️ Weather machine"
        description="Track weather of your favorites location. XState + Actors (invoked)"
        route="/weather"
      />

      {/* https://open-meteo.com/ */}
    </Box>
  );
};

export default Home;
