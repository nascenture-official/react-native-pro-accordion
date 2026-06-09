import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

/**
 * Separator component for accordion items
 * @param {Object} props
 * @param {Object} props.style - Custom style for separator
 * @param {string} props.color - Color of separator
 * @param {number} props.thickness - Thickness of separator
 * @param {number} props.marginVertical - Vertical margin
 * @param {boolean} props.hasIcon - Whether adjacent item has icon
 * @param {string} props.iconPosition - Position of icon ('left' or 'right')
 */
export const AccordionSeparator = memo(
  ({
    style,
    color = "#E0E0E0",
    thickness = 1,
    marginVertical = 8,
    hasIcon = false,
    iconPosition = "right",
  }) => {
    const getSeparatorStyle = () => {
      const baseStyle = {
        height: thickness,
        backgroundColor: color,
        marginVertical,
      };

      // Adjust indentation if there's an icon
      if (hasIcon) {
        if (iconPosition === "left") {
          return {
            ...baseStyle,
            marginLeft: 40, // Account for icon width + padding
          };
        }
      }

      return baseStyle;
    };

    return <View style={[styles.container, getSeparatorStyle(), style]} />;
  },
);

/**
 * Separator with indentation for nested accordions
 */
export const NestedAccordionSeparator = memo(
  ({
    style,
    color = "#E0E0E0",
    thickness = 1,
    marginVertical = 8,
    nestingLevel = 0,
  }) => {
    const getNestedStyle = () => {
      const baseStyle = {
        height: thickness,
        backgroundColor: color,
        marginVertical,
        marginLeft: nestingLevel * 16, // Indent based on nesting level
      };
      return baseStyle;
    };

    return <View style={[styles.container, getNestedStyle(), style]} />;
  },
);

/**
 * Custom separator with dashed style
 */
export const DashedSeparator = memo(
  ({
    style,
    color = "#E0E0E0",
    thickness = 1,
    dashLength = 5,
    dashGap = 3,
    marginVertical = 8,
  }) => {
    return (
      <View style={[styles.dashedContainer, { marginVertical }, style]}>
        <View
          style={{
            height: thickness,
            backgroundColor: color,
            width: dashLength,
            marginRight: dashGap,
          }}
        />
        <View
          style={{
            height: thickness,
            backgroundColor: color,
            width: dashLength,
            marginRight: dashGap,
          }}
        />
        <View
          style={{
            height: thickness,
            backgroundColor: color,
            width: dashLength,
            marginRight: dashGap,
          }}
        />
        <View
          style={{
            height: thickness,
            backgroundColor: color,
            width: dashLength,
          }}
        />
      </View>
    );
  },
);

/**
 * Gradient separator for modern UI
 */
export const GradientSeparator = memo(
  ({
    style,
    colors = ["#E0E0E0", "#FFFFFF"],
    height = 1,
    marginVertical = 8,
  }) => {
    // Note: For actual gradient, you'd need Expo LinearGradient or similar
    // This is a simplified version
    return (
      <View
        style={[
          styles.gradientContainer,
          {
            height,
            marginVertical,
            backgroundColor: colors[0],
          },
          style,
        ]}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dashedContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  gradientContainer: {
    width: "100%",
    opacity: 0.5,
  },
});

AccordionSeparator.displayName = "AccordionSeparator";
NestedAccordionSeparator.displayName = "NestedAccordionSeparator";
DashedSeparator.displayName = "DashedSeparator";
GradientSeparator.displayName = "GradientSeparator";
