import { useState, useCallback, useRef, useEffect } from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Hook for measuring content height
 * @returns {Object} Height measurement utilities
 */
export const useContentHeight = () => {
  const [height, setHeight] = useState(0);
  const [isMeasured, setIsMeasured] = useState(false);
  const measuredHeightRef = useRef(0);

  const onLayout = useCallback((event) => {
    const newHeight = event.nativeEvent.layout.height;
    if (newHeight !== measuredHeightRef.current && newHeight > 0) {
      measuredHeightRef.current = newHeight;
      setHeight(newHeight);
      setIsMeasured(true);
    }
  }, []);

  const resetHeight = useCallback(() => {
    setHeight(0);
    setIsMeasured(false);
    measuredHeightRef.current = 0;
  }, []);

  return {
    height,
    isMeasured,
    onLayout,
    resetHeight,
  };
};

/**
 * Hook for measuring multiple content heights
 * @returns {Object} Map of heights for multiple items
 */
export const useMultipleContentHeights = () => {
  const [heights, setHeights] = useState({});
  const measuredRefs = useRef({});

  const onLayout = useCallback((id, event) => {
    const newHeight = event.nativeEvent.layout.height;
    if (newHeight !== measuredRefs.current[id] && newHeight > 0) {
      measuredRefs.current[id] = newHeight;
      setHeights((prev) => ({ ...prev, [id]: newHeight }));
    }
  }, []);

  const getHeight = useCallback(
    (id) => {
      return heights[id] || 0;
    },
    [heights],
  );

  const resetHeights = useCallback(() => {
    setHeights({});
    measuredRefs.current = {};
  }, []);

  return {
    heights,
    getHeight,
    onLayout,
    resetHeights,
  };
};

/**
 * Animates layout changes
 * @param {Object} config - Animation configuration
 */
export const animateLayout = (config = {}) => {
  const { duration = 300, type = "easeInEaseOut", property = "all" } = config;

  LayoutAnimation.configureNext(
    LayoutAnimation.create(duration, type, property),
  );
};

/**
 * Smooth scroll to an accordion item
 * @param {Object} scrollViewRef - Reference to ScrollView
 * @param {number} yPosition - Y position to scroll to
 * @param {Object} options - Scroll options
 */
export const scrollToAccordionItem = (
  scrollViewRef,
  yPosition,
  options = {},
) => {
  const { animated = true, duration = 300, offset = 0 } = options;

  if (!scrollViewRef?.current) return;

  const targetY = yPosition - offset;

  if (Platform.OS === "ios") {
    scrollViewRef.current.scrollTo({ y: targetY, animated });
  } else {
    if (animated && duration) {
      // For Android with custom duration
      scrollViewRef.current.scrollTo({ y: targetY, animated: false });
      // You might need a custom scroll animation library for smooth Android scrolling
    } else {
      scrollViewRef.current.scrollTo({ y: targetY, animated });
    }
  }
};

/**
 * Get element position relative to parent
 * @param {Object} elementRef - Reference to element
 * @returns {Promise<Object>} Position information
 */
export const getElementPosition = (elementRef) => {
  return new Promise((resolve) => {
    if (!elementRef?.current) {
      resolve({ x: 0, y: 0, width: 0, height: 0 });
      return;
    }

    elementRef.current.measure((x, y, width, height, pageX, pageY) => {
      resolve({ x: pageX, y: pageY, width, height });
    });
  });
};
