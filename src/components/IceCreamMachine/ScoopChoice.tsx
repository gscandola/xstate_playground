import { Flavor } from "@/machines/IceCreamMachine/machine";
import { PressEventHandler } from "@gemini/core";
import { Button } from "@gemini/ui";

interface ScoopChoices {
  items: Array<{ label: string; value: Flavor }>;
  selectedFlavors: Array<Flavor>;
  onSelect: (value: Flavor) => void;
}

export const ScoopChoices = ({
  items,
  selectedFlavors,
  onSelect,
}: ScoopChoices) => {
  return (
    <>
      {items.map(
        ({ label, value }) =>
          !selectedFlavors.includes(value) && (
            <Button
              marginRight="spacing.4"
              key={value}
              onPress={() => {
                onSelect(value);
              }}
            >
              {label}
            </Button>
          )
      )}
    </>
  );
};

export default ScoopChoices;
