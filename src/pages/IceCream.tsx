import MyIceCreams from "@/components/IceCreamMachine/MyIceCreams";
import { ScoopChoices } from "@/components/IceCreamMachine/ScoopChoice";
import StateDisplay from "@/components/IceCreamMachine/StateDisplay";
import IceCreamMachine from "@/machines/IceCreamMachine";
import { Box } from "@gemini/core";
import { Button, Link } from "@gemini/ui";
import { useMachine } from "@xstate/react";

const IceCream = () => {
  const [state, send] = useMachine(IceCreamMachine);

  const { iceCreams } = state.context;

  return (
    <Box padding="spacing.32">
      <Link href="/">Back</Link>
      <Box display="flex">
        <Box flex="1">
          <StateDisplay state={state} />
        </Box>
        <Box flex="1" marginLeft="spacing.4">
          <MyIceCreams iceCreams={iceCreams} />
        </Box>
      </Box>
      <Box marginTop="spacing.8">
        {state.matches("idle") && (
          <Button
            onPress={() => {
              send({ type: "new" });
            }}
          >
            😋 New ice cream
          </Button>
        )}
        {state.matches({ define: "container" }) && (
          <>
            <Button
              onPress={() => {
                send({ type: "chooseContainer", container: "bowl" });
              }}
            >
              🍨 Bowl
            </Button>
            <Button
              marginLeft="spacing.4"
              onPress={() => {
                send({ type: "chooseContainer", container: "cone" });
              }}
            >
              🍦 Cone
            </Button>
          </>
        )}
        {state.matches({ define: "scoop" }) && (
          <>
            <ScoopChoices
              selectedFlavors={state.context.selectedFlavors}
              items={[
                { label: "🍫 Chocolate", value: "chocolate" },
                { label: "🥥 Coconut", value: "coconut" },
                { label: "🍯 Honey", value: "honey" },
              ]}
              onSelect={(flavor) => {
                send({ type: "addScoop", flavor });
              }}
            />
            <Button
              onPress={() => {
                send({ type: "makeIceCream" });
              }}
            >
              Give it to me 😋
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default IceCream;
