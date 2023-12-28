import { Box } from "@gemini/core";
import { Button } from "@gemini/ui";

interface MachineCardProps {
  title: string;
  description: string;
  route: string;
}

export const MachineCard = ({
  title,
  description,
  route,
}: MachineCardProps) => {
  return (
    <Box
      padding="spacing.8"
      borderRadius="radius.8"
      borderColor="color.surface.brand.primary.default"
      borderStyle="solid"
      borderWidth="borderWidth.1"
      marginBottom="spacing.8"
    >
      <Box>
        <Box as="h1" typography="typography.headline.22.bold">
          {title}
        </Box>
        <Box as="p">{description}</Box>
      </Box>
      <Button href={route} size="40">
        Go to machine
      </Button>
    </Box>
  );
};

export default MachineCard;
