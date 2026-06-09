import React, {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, StyleSheet } from "react-native";
import { AccordionProvider } from "../core/AccordionContext";
import { AccordionRefImpl } from "../core/AccordionRef";
import { defaultLightTheme, defaultDarkTheme } from "../theme/defaultTheme";

export const Accordion = forwardRef((props, ref) => {
  const {
    children,
    value: controlledValue,
    defaultValue = [],
    onChange,
    mode = "single",
    readOnly = false,
    animation = { type: "timing", duration: 300 },
    renderIcon,
    iconPosition = "right",
    showSeparators = false,
    separatorComponent,
    separatorStyle,
    stickyHeaders = false,
    lazyRender = false,
    theme: customTheme,
    darkMode = false,
    accessibilityLabel,
    testID,
    onOpen,
    onClose,
    onToggle,
    onAnimationStart,
    onAnimationEnd,
    onStateChange,
  } = props;

  // State management
  const isControlled = controlledValue !== undefined;
  const [internalExpandedValues, setInternalExpandedValues] =
    useState(defaultValue);

  const expandedValues = isControlled
    ? controlledValue
    : internalExpandedValues;
  const expandedValuesRef = useRef(expandedValues);
  expandedValuesRef.current = expandedValues;

  const setExpandedValues = useCallback(
    (newValues) => {
      if (!isControlled) {
        setInternalExpandedValues(newValues);
      }
      onChange?.(newValues);
      onStateChange?.(newValues);
    },
    [isControlled, onChange, onStateChange],
  );

  const handleToggleItem = useCallback(
    (value) => {
      const isCurrentlyExpanded = expandedValues.includes(value);
      let newValues;

      if (isCurrentlyExpanded) {
        newValues = expandedValues.filter((v) => v !== value);
        onClose?.(value);
        onToggle?.(value, false);
      } else {
        if (mode === "single") {
          newValues = [value];
        } else {
          newValues = [...expandedValues, value];
        }
        onOpen?.(value);
        onToggle?.(value, true);
      }

      setExpandedValues(newValues);
    },
    [expandedValues, mode, setExpandedValues, onOpen, onClose, onToggle],
  );

  // Expose ref methods
  useImperativeHandle(
    ref,
    () =>
      new AccordionRefImpl(
        expandedValuesRef,
        setExpandedValues,
        mode,
        readOnly,
      ),
    [mode, readOnly, setExpandedValues],
  );

  // Theme merging
  const baseTheme = darkMode ? defaultDarkTheme : defaultLightTheme;
  const theme = customTheme
    ? {
        ...baseTheme,
        ...customTheme,
        colors: { ...baseTheme.colors, ...customTheme.colors },
      }
    : baseTheme;

  return (
    <AccordionProvider
      mode={mode}
      readOnly={readOnly}
      animationConfig={animation}
      renderIcon={renderIcon}
      iconPosition={iconPosition}
      showSeparators={showSeparators}
      lazyRender={lazyRender}
      theme={theme}
      darkMode={darkMode}
      expandedValues={expandedValues}
      onToggleItem={handleToggleItem}
    >
      <View
        style={styles.container}
        accessible={!!accessibilityLabel}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        {React.Children.map(children, (child, index) => {
          const isLast = index === React.Children.count(children) - 1;
          return (
            <React.Fragment key={index}>
              {child}
              {showSeparators &&
                !isLast &&
                (separatorComponent || (
                  <View
                    style={[
                      styles.defaultSeparator,
                      separatorStyle,
                      { backgroundColor: theme.colors.border },
                    ]}
                  />
                ))}
            </React.Fragment>
          );
        })}
      </View>
    </AccordionProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  defaultSeparator: {
    height: 1,
    width: "100%",
  },
});

Accordion.displayName = "Accordion";
