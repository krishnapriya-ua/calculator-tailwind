import {create} from "zustand";

const useStore = create((set) => ({
  extraComponents: [],
  buttonOrder: [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", "C", "=", "+"],
  ],
  addExtraComponent: (component) =>
    set((state) => ({
      extraComponents: [...state.extraComponents, component],
    })),
  removeExtraComponent: (component) =>
    set((state) => ({
      extraComponents: state.extraComponents.filter(
        (item) => item !== component
      ),
    })),
  setButtonOrder: (newButtonOrder) =>
    set(() => ({
      buttonOrder: newButtonOrder,
    })),
}));

export default useStore;
