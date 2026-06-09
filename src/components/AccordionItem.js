import React, { useEffect, useCallback, memo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useAccordion } from "../core/AccordionContext";
import { AccordionContent } from "./AccordionContent";
import { useAccordionAccessibility } from "../hooks/useAccordionAccessibility";
import { useAccordionKeyboard } from "../hooks/useAccordionKeyboard";

export const AccordionItem = memo((props) => {
  const {
    value,
    header,
    children,
    disabled = false,
    style,
    headerStyle,
    contentStyle,
    data,
  } = props;

  const accordion = useAccordion();
  const {
    mode,
    readOnly,
    renderIcon,
    iconPosition,
    lazyRender,
    theme,
    darkMode,
    registerItem,
    unregisterItem,
    toggleItem,
    isExpanded,
  } = accordion;

  const expanded = isExpanded(value);

  // Register/unregister item
  useEffect(() => {
    registerItem(value, disabled, data);
    return () => unregisterItem(value);
  }, [value, disabled, data, registerItem, unregisterItem]);

  const handlePress = useCallback(() => {
    if (readOnly || disabled) return;
    toggleItem(value);
  }, [readOnly, disabled, toggleItem, value]);

  // Accessibility
  const { accessibilityProps } = useAccordionAccessibility({
    expanded,
    disabled: disabled || readOnly,
    label: `Toggle accordion item ${value}`,
  });

  // Keyboard navigation
  const { keyboardProps } = useAccordionKeyboard({
    onPress: handlePress,
    disabled: disabled || readOnly,
  });

  // Render header content
  const renderHeaderContent = () => {
    if (typeof header === "function") {
      return header({ expanded, disabled });
    }
    return header;
  };

  // Render icon
  const renderIconComponent = () => {
    if (!renderIcon) return null;

    const iconElement = renderIcon({ expanded, disabled });
    if (!iconElement) return null;

    return (
      <View
        style={iconPosition === "left" ? styles.leftIcon : styles.rightIcon}
      >
        {iconElement}
      </View>
    );
  };

  const headerContent = (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled || readOnly}
      style={[
        styles.header,
        headerStyle,
        disabled && styles.disabledHeader,
        { backgroundColor: theme?.colors?.surface },
      ]}
      {...accessibilityProps}
      {...keyboardProps}
    >
      {iconPosition === "left" && renderIconComponent()}
      <View style={styles.headerTextContainer}>{renderHeaderContent()}</View>
      {iconPosition === "right" && renderIconComponent()}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      {headerContent}
      <AccordionContent
        expanded={expanded}
        animationConfig={accordion.animationConfig}
        lazyRender={lazyRender}
        theme={theme}
        contentStyle={contentStyle}
      >
        {typeof children === "function" ? children({ expanded }) : children}
      </AccordionContent>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  disabledHeader: {
    opacity: 0.5,
  },
  headerTextContainer: {
    flex: 1,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
});

AccordionItem.displayName = "AccordionItem";
