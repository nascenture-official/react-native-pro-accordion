import { useMemo } from "react";
import { Platform } from "react-native";

export const useAccordionAccessibility = (props) => {
  const { expanded, disabled, label } = props;

  const accessibilityProps = useMemo(() => {
    const baseProps = {
      accessible: true,
      accessibilityRole: "button",
      accessibilityState: {
        expanded,
        disabled,
      },
      accessibilityLabel: label || "Toggle accordion",
    };

    if (Platform.OS === "web") {
      return {
        ...baseProps,
        "aria-expanded": expanded,
        "aria-disabled": disabled,
      };
    }

    return baseProps;
  }, [expanded, disabled, label]);

  return { accessibilityProps };
};
