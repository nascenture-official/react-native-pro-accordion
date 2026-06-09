import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Hook for managing accordion state with controlled/uncontrolled modes
 * @param {Object} options
 * @param {string[]} options.value - Controlled expanded values
 * @param {string[]} options.defaultValue - Default expanded values for uncontrolled mode
 * @param {Function} options.onChange - Callback when expanded values change
 * @param {string} options.mode - 'single' or 'multiple' mode
 * @returns {Object} State management utilities
 */
export const useAccordionState = ({
  value,
  defaultValue = [],
  onChange,
  mode = "multiple",
}) => {
  const isControlled = value !== undefined;
  const [internalExpandedValues, setInternalExpandedValues] =
    useState(defaultValue);

  const expandedValues = isControlled ? value : internalExpandedValues;
  const expandedValuesRef = useRef(expandedValues);
  expandedValuesRef.current = expandedValues;

  const setExpandedValues = useCallback(
    (newValues) => {
      if (!isControlled) {
        setInternalExpandedValues(newValues);
      }
      onChange?.(newValues);
    },
    [isControlled, onChange],
  );

  const isExpanded = useCallback(
    (itemValue) => {
      return expandedValues.includes(itemValue);
    },
    [expandedValues],
  );

  const openItem = useCallback(
    (itemValue) => {
      if (expandedValues.includes(itemValue)) return;

      let newValues;
      if (mode === "single") {
        newValues = [itemValue];
      } else {
        newValues = [...expandedValues, itemValue];
      }

      setExpandedValues(newValues);
      return newValues;
    },
    [expandedValues, mode, setExpandedValues],
  );

  const closeItem = useCallback(
    (itemValue) => {
      if (!expandedValues.includes(itemValue)) return;

      const newValues = expandedValues.filter((v) => v !== itemValue);
      setExpandedValues(newValues);
      return newValues;
    },
    [expandedValues, setExpandedValues],
  );

  const toggleItem = useCallback(
    (itemValue) => {
      if (expandedValues.includes(itemValue)) {
        return closeItem(itemValue);
      } else {
        return openItem(itemValue);
      }
    },
    [expandedValues, openItem, closeItem],
  );

  const expandAll = useCallback(() => {
    if (mode !== "multiple") return;
    // Note: This requires access to all registered items
    console.warn("expandAll requires all item values to be accessible");
  }, [mode]);

  const collapseAll = useCallback(() => {
    setExpandedValues([]);
  }, [setExpandedValues]);

  const toggleAll = useCallback(() => {
    if (mode !== "multiple") return;
    if (expandedValues.length > 0) {
      collapseAll();
    } else {
      expandAll();
    }
  }, [mode, expandedValues.length, collapseAll, expandAll]);

  const getExpandedItems = useCallback(() => {
    return [...expandedValues];
  }, [expandedValues]);

  return {
    expandedValues,
    expandedValuesRef,
    setExpandedValues,
    isExpanded,
    openItem,
    closeItem,
    toggleItem,
    expandAll,
    collapseAll,
    toggleAll,
    getExpandedItems,
    isControlled,
  };
};
