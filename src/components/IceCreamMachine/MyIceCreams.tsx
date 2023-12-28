import { IceCream } from "@/machines/IceCreamMachine";
import { Box } from "@gemini/core";

interface MyIceCreamsProps {
  iceCreams: Array<IceCream>;
}

const MyIceCreams = ({ iceCreams }: MyIceCreamsProps) => {
  if (iceCreams.length === 0) return "No ice cream yet...";

  return (
    <Box as="ul">
      {iceCreams.map((iceCream, index) => {
        const container = iceCream.container === "bowl" ? "🍨" : "🍦";
        const flavors = iceCream.flavors.map((flavor) => {
          return flavor === "chocolate"
            ? "🟤"
            : flavor === "coconut"
            ? "⚪️"
            : "🟡";
        });

        return (
          <Box as="li" key={index}>
            {`A ${container} filled with ${flavors.join(", ")}`}
          </Box>
        );
      })}
    </Box>
  );
};

export default MyIceCreams;
