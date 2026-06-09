import React, { createContext, useContext, useRef, useCallback } from "react";

const defaultAnimationConfig = {
  type: "timing",
  duration: 300,
};

export const AccordionContext = createContext(null);

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an Accordion");
  }
  return context;
};

export const AccordionProvider = ({
  mode,
  readOnly,
  animationConfig = defaultAnimationConfig,
  renderIcon,
  iconPosition = "right",
  showSeparators = false,
  lazyRender = false,
  theme,
  darkMode = false,
  expandedValues,
  onToggleItem,
  children,
}) => {
  const itemsMap = useRef(new Map());
  const eventsRef = useRef({});

  const registerItem = useCallback((value, disabled = false, data) => {
    itemsMap.current.set(value, { disabled, data });
  }, []);

  const unregisterItem = useCallback((value) => {
    itemsMap.current.delete(value);
  }, []);

  const toggleItem = useCallback(
    (value) => {
      if (readOnly) return;
      const item = itemsMap.current.get(value);
      if (item?.disabled) return;
      onToggleItem(value);
    },
    [readOnly, onToggleItem],
  );

  const isExpanded = useCallback(
    (value) => {
      return expandedValues.includes(value);
    },
    [expandedValues],
  );

  const getItemData = useCallback((value) => {
    return itemsMap.current.get(value)?.data;
  }, []);

  const contextValue = {
    mode,
    readOnly,
    animationConfig,
    renderIcon,
    iconPosition,
    showSeparators,
    lazyRender,
    theme,
    darkMode,
    registerItem,
    unregisterItem,
    toggleItem,
    isExpanded,
    getItemData,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      {children}
    </AccordionContext.Provider>
  );
};
