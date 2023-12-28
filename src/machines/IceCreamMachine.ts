import { assign, createMachine } from "xstate";

type Container = "bowl" | "cone";
export type Flavor = "chocolate" | "coconut" | "honey";
type EventNew = { type: "new" };
type EventChooseContainer = {
  type: "chooseContainer";
  container: Container;
};
type EventAddScoop = {
  type: "addScoop";
  flavor: Flavor;
};
type EventMakeIceCream = { type: "makeIceCream" };
type EventGrabIceCream = { type: "grabIceCream" };

type IceScreamMachineEvents =
  | EventNew
  | EventChooseContainer
  | EventAddScoop
  | EventMakeIceCream
  | EventGrabIceCream;

export type IceCream = {
  container: Container;
  flavors: Array<Flavor>;
};

const iceCreamMachine = createMachine({
  // Identifier of this machine
  id: "iceCream",
  // Initial state of the machine
  initial: "idle",
  // Typing (for Typescript exclusively)
  types: {} as {
    context: {
      iceCreams: Array<IceCream>;
      selectedContainer?: Container;
      selectedFlavors: Array<Flavor>;
    };
    events: IceScreamMachineEvents;
  },
  // Initial context of the machine
  context: {
    iceCreams: [],
    selectedContainer: undefined,
    selectedFlavors: [],
  },
  // All possible states (and their transition & actions)
  states: {
    idle: {
      // Required to do transition from nested child to a parent state
      // see https://stately.ai/docs/transitions#cheatsheet-transition-targets
      id: "idle",
      // List all transition available for this "idle" state value
      on: {
        // When action "new" is dispatch, state transit to "define" state
        new: {
          target: "define",
        },
      },
    },
    define: {
      // Nested state here, define state has 2 children: "container" & "scoop"
      initial: "container",
      states: {
        container: {
          on: {
            chooseContainer: {
              // target sibling state
              // see https://stately.ai/docs/transitions#transitions-to-any-state
              target: "scoop",
              actions: assign({
                selectedContainer: ({ event }) => event.container,
              }),
            },
          },
        },
        scoop: {
          on: {
            addScoop: {
              // No target = self transition
              actions: assign({
                selectedFlavors: ({ context, event }) => {
                  return [...context.selectedFlavors, event.flavor];
                },
              }),
            },
            makeIceCream: {
              target: "#make",
            },
          },
        },
      },
    },
    make: {
      id: 'make',
      after: {
        2000: {
          target: "idle",
          actions: assign({
            iceCreams: ({ context }) => {
              return [
                ...context.iceCreams,
                {
                  // We know that here we have a container
                  container: context.selectedContainer!,
                  flavors: context.selectedFlavors,
                },
              ];
            },
            selectedFlavors: [],
            selectedContainer: undefined,
          }),
        },
      },
    },
  },
});

export default iceCreamMachine;
