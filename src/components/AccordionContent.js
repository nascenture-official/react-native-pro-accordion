import React, { useRef, useEffect, useState, memo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from "react-native-reanimated";

export const AccordionContent = memo((props) => {
  const {
    expanded,
    children,
    animationConfig,
    lazyRender = false,
    theme,
    contentStyle,
    onAnimationStart,
    onAnimationEnd,
  } = props;

  const [contentHeight, setContentHeight] = useState(0);
  const [shouldRender, setShouldRender] = useState(expanded || !lazyRender);
  const height = useSharedValue(expanded ? contentHeight : 0);
  const opacity = useSharedValue(expanded ? 1 : 0);

  useEffect(() => {
    if (expanded && lazyRender && !shouldRender) {
      setShouldRender(true);
    }
  }, [expanded, lazyRender, shouldRender]);

  useEffect(() => {
    if (onAnimationStart) {
      runOnJS(onAnimationStart)();
    }

    const animateHeight = () => {
      const toValue = expanded ? contentHeight : 0;

      if (animationConfig.type === "spring") {
        height.value = withSpring(
          toValue,
          {
            damping: animationConfig.damping ?? 10,
            mass: animationConfig.mass ?? 1,
            stiffness: animationConfig.stiffness ?? 100,
            overshootClamping: animationConfig.overshootClamping ?? false,
            restSpeedThreshold: animationConfig.restSpeedThreshold ?? 0.01,
            restDisplacementThreshold:
              animationConfig.restDisplacementThreshold ?? 0.01,
          },
          (finished) => {
            if (finished && onAnimationEnd) {
              runOnJS(onAnimationEnd)();
            }
            if (!expanded && lazyRender && !finished) {
              runOnJS(setShouldRender)(false);
            }
          },
        );
      } else {
        height.value = withTiming(
          toValue,
          {
            duration: animationConfig.duration ?? 300,
            easing: animationConfig.easing ?? Easing.inOut(Easing.ease),
          },
          (finished) => {
            if (finished && onAnimationEnd) {
              runOnJS(onAnimationEnd)();
            }
            if (!expanded && lazyRender && !finished) {
              runOnJS(setShouldRender)(false);
            }
          },
        );
      }
    };

    animateHeight();

    // Animate opacity for fade effect
    if (animationConfig.type === "spring") {
      opacity.value = withSpring(expanded ? 1 : 0, {
        damping: animationConfig.damping ?? 10,
        mass: animationConfig.mass ?? 1,
        stiffness: animationConfig.stiffness ?? 100,
      });
    } else {
      opacity.value = withTiming(expanded ? 1 : 0, {
        duration: (animationConfig.duration ?? 300) * 0.6,
        easing: animationConfig.easing ?? Easing.inOut(Easing.ease),
      });
    }
  }, [expanded, contentHeight, animationConfig]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
    overflow: "hidden",
  }));

  const onLayout = (event) => {
    const newHeight = event.nativeEvent.layout.height;
    if (newHeight !== contentHeight && newHeight > 0) {
      setContentHeight(newHeight);
      if (expanded && height.value === 0) {
        height.value = newHeight;
      }
    }
  };

  if (!shouldRender) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View
        onLayout={onLayout}
        style={[
          styles.content,
          contentStyle,
          { backgroundColor: theme?.colors?.background },
        ]}
      >
        {children}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

AccordionContent.displayName = "AccordionContent";
