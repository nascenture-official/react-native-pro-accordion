import { withTiming, withSpring, Easing } from "react-native-reanimated";

export const getAnimatedHeight = (expanded, contentHeight, config) => {
  const toValue = expanded ? contentHeight : 0;

  if (config.type === "spring") {
    return withSpring(toValue, {
      damping: config.damping ?? 10,
      mass: config.mass ?? 1,
      stiffness: config.stiffness ?? 100,
      overshootClamping: config.overshootClamping ?? false,
      restSpeedThreshold: config.restSpeedThreshold ?? 0.01,
      restDisplacementThreshold: config.restDisplacementThreshold ?? 0.01,
    });
  }

  return withTiming(toValue, {
    duration: config.duration ?? 300,
    easing: config.easing ?? Easing.inOut(Easing.ease),
  });
};

export const getAnimatedOpacity = (expanded, config) => {
  const toValue = expanded ? 1 : 0;

  if (config.type === "spring") {
    return withSpring(toValue, {
      damping: config.damping ?? 10,
      mass: config.mass ?? 1,
      stiffness: config.stiffness ?? 100,
    });
  }

  return withTiming(toValue, {
    duration: (config.duration ?? 300) * 0.6,
    easing: config.easing ?? Easing.inOut(Easing.ease),
  });
};
