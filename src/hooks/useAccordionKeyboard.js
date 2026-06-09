import { useEffect, useRef } from "react";
import { Platform } from "react-native";

export const useAccordionKeyboard = (props) => {
  const { onPress, disabled = false } = props;
  const elementRef = useRef(null);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const handleKeyPress = (event) => {
      if (disabled) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onPress();
      }
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      if (element) {
        element.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [onPress, disabled]);

  const keyboardProps =
    Platform.OS === "web"
      ? { tabIndex: disabled ? -1 : 0, ref: elementRef }
      : {};

  return { keyboardProps };
};
