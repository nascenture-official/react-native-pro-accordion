// src/index.js
// export { Accordion } from "./Accordion";
// export { AccordionItem } from "./AccordionItem";

// Main components
export { Accordion } from "./components/Accordion";
export { AccordionItem } from "./components/AccordionItem";
export { AccordionContent } from "./components/AccordionContent";
export {
  AccordionSeparator,
  NestedAccordionSeparator,
  DashedSeparator,
  GradientSeparator,
} from "./components/AccordionSeparator";

// Context
export { useAccordion, AccordionContext } from "./core/AccordionContext";

// Hooks
export { useAccordionAccessibility } from "./hooks/useAccordionAccessibility";
export { useAccordionKeyboard } from "./hooks/useAccordionKeyboard";
export { useAccordionState } from "./hooks/useAccordionState";
export { useAccordionAnimation } from "./hooks/useAccordionAnimation";

// Theme
export { defaultLightTheme, defaultDarkTheme } from "./theme/defaultTheme";
export { ThemeProvider, useTheme } from "./theme/ThemeContext";

// Utilities
export { getAnimatedHeight, getAnimatedOpacity } from "./utils/animations";

export {
  validateAnimationConfig,
  validateAccordionMode,
} from "./utils/validators";

export {
  useContentHeight,
  useMultipleContentHeights,
  animateLayout,
  scrollToAccordionItem,
  getElementPosition,
} from "./utils/layout";

// Re-export types for JSDoc (for documentation purposes)
/**
 * @typedef {import('./core/types').AccordionProps} AccordionProps
 * @typedef {import('./core/types').AccordionItemProps} AccordionItemProps
 * @typedef {import('./core/types').AccordionRef} AccordionRef
 * @typedef {import('./core/types').AccordionTheme} AccordionTheme
 * @typedef {import('./core/types').AnimationConfig} AnimationConfig
 * @typedef {import('./core/types').TimingAnimationConfig} TimingAnimationConfig
 * @typedef {import('./core/types').SpringAnimationConfig} SpringAnimationConfig
 * @typedef {import('./core/types').AnimationType} AnimationType
 * @typedef {import('./core/types').AccordionEventHandlers} AccordionEventHandlers
 */
