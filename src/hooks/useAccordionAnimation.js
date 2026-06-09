import { useRef, useEffect, useCallback } from "react";
import {
  useSharedValue,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from "react-native-reanimated";

/**
 * Hook for managing accordion animations
 * @param {Object} options
 * @param {boolean} options.expanded - Whether item is expanded
 * @param {number} options.contentHeight - Height of the content
 * @param {Object} options.animationConfig - Animation configuration
 * @param {Function} options.onAnimationStart - Callback when animation starts
 * @param {Function} options.onAnimationEnd - Callback when animation ends
 * @returns {Object} Animation values and utilities
 */
export const useAccordionAnimation = ({
  expanded,
  contentHeight,
  animationConfig,
  onAnimationStart,
  onAnimationEnd,
}) => {
  const height = useSharedValue(expanded ? contentHeight : 0);
  const opacity = useSharedValue(expanded ? 1 : 0);
  const rotation = useSharedValue(expanded ? 1 : 0);
  const isAnimating = useRef(false);

  const getAnimatedHeight = useCallback(
    (toValue) => {
      if (animationConfig.type === "spring") {
        return withSpring(toValue, {
          damping: animationConfig.damping ?? 10,
          mass: animationConfig.mass ?? 1,
          stiffness: animationConfig.stiffness ?? 100,
          overshootClamping: animationConfig.overshootClamping ?? false,
          restSpeedThreshold: animationConfig.restSpeedThreshold ?? 0.01,
          restDisplacementThreshold:
            animationConfig.restDisplacementThreshold ?? 0.01,
        });
      } else {
        return withTiming(toValue, {
          duration: animationConfig.duration ?? 300,
          easing: animationConfig.easing ?? Easing.inOut(Easing.ease),
        });
      }
    },
    [animationConfig],
  );

  const getAnimatedOpacity = useCallback(
    (toValue) => {
      if (animationConfig.type === "spring") {
        return withSpring(toValue, {
          damping: animationConfig.damping ?? 10,
          mass: animationConfig.mass ?? 1,
          stiffness: animationConfig.stiffness ?? 100,
        });
      } else {
        return withTiming(toValue, {
          duration: (animationConfig.duration ?? 300) * 0.6,
          easing: animationConfig.easing ?? Easing.inOut(Easing.ease),
        });
      }
    },
    [animationConfig],
  );

  const getAnimatedRotation = useCallback(
    (toValue) => {
      const targetRotation = toValue ? 1 : 0;
      if (animationConfig.type === "spring") {
        return withSpring(targetRotation, {
          damping: animationConfig.damping ?? 10,
          mass: animationConfig.mass ?? 1,
          stiffness: animationConfig.stiffness ?? 100,
        });
      } else {
        return withTiming(targetRotation, {
          duration: animationConfig.duration ?? 300,
          easing: animationConfig.easing ?? Easing.inOut(Easing.ease),
        });
      }
    },
    [animationConfig],
  );

  const animate = useCallback(() => {
    if (onAnimationStart) {
      runOnJS(onAnimationStart)();
    }

    isAnimating.current = true;
    const toHeight = expanded ? contentHeight : 0;
    const toOpacity = expanded ? 1 : 0;
    const toRotation = expanded ? 1 : 0;

    height.value = getAnimatedHeight(toHeight);
    opacity.value = getAnimatedOpacity(toOpacity);
    rotation.value = getAnimatedRotation(toRotation);

    // Set up animation end callback
    const timeoutId = setTimeout(
      () => {
        if (isAnimating.current && onAnimationEnd) {
          runOnJS(onAnimationEnd)();
          isAnimating.current = false;
        }
      },
      animationConfig.type === "spring"
        ? 500
        : (animationConfig.duration ?? 300),
    );

    return () => clearTimeout(timeoutId);
  }, [
    expanded,
    contentHeight,
    animationConfig,
    height,
    opacity,
    rotation,
    getAnimatedHeight,
    getAnimatedOpacity,
    getAnimatedRotation,
    onAnimationStart,
    onAnimationEnd,
  ]);

  useEffect(() => {
    const cleanup = animate();
    return () => {
      if (cleanup) cleanup();
      isAnimating.current = false;
    };
  }, [animate]);

  const resetAnimation = useCallback(() => {
    height.value = 0;
    opacity.value = 0;
    rotation.value = 0;
    isAnimating.current = false;
  }, [height, opacity, rotation]);

  const getRotatedStyle = useCallback(() => {
    "worklet";
    return {
      transform: [{ rotate: `${rotation.value * 90}deg` }],
    };
  }, [rotation]);

  return {
    height,
    opacity,
    rotation,
    isAnimating: isAnimating.current,
    animatedHeightStyle: { height },
    animatedOpacityStyle: { opacity },
    animatedRotationStyle: getRotatedStyle,
    resetAnimation,
  };
};
