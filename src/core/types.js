/**
 * @typedef {'timing' | 'spring'} AnimationType
 */

/**
 * @typedef {Object} TimingAnimationConfig
 * @property {'timing'} type
 * @property {number} [duration]
 * @property {Function} [easing]
 */

/**
 * @typedef {Object} SpringAnimationConfig
 * @property {'spring'} type
 * @property {number} [damping]
 * @property {number} [mass]
 * @property {number} [stiffness]
 * @property {boolean} [overshootClamping]
 * @property {number} [restSpeedThreshold]
 * @property {number} [restDisplacementThreshold]
 */

/**
 * @typedef {TimingAnimationConfig | SpringAnimationConfig} AnimationConfig
 */

/**
 * @typedef {Object} AccordionTheme
 * @property {Object} colors
 * @property {string} colors.background
 * @property {string} colors.surface
 * @property {string} colors.primary
 * @property {string} colors.text
 * @property {string} colors.textSecondary
 * @property {string} colors.border
 * @property {string} colors.disabled
 * @property {string} colors.icon
 * @property {Object} spacing
 * @property {number} spacing.xs
 * @property {number} spacing.sm
 * @property {number} spacing.md
 * @property {number} spacing.lg
 * @property {number} spacing.xl
 * @property {Object} typography
 * @property {Object} typography.header
 * @property {Object} typography.content
 * @property {Object} borderRadius
 * @property {number} borderRadius.sm
 * @property {number} borderRadius.md
 * @property {number} borderRadius.lg
 */

/**
 * @typedef {Object} AccordionItemProps
 * @property {string} value - Unique identifier for the item
 * @property {React.ReactNode | Function} header - Header content or render function
 * @property {React.ReactNode | Function} children - Content to display when expanded
 * @property {boolean} [disabled] - Whether the item is disabled
 * @property {object} [style] - Custom style overrides
 * @property {object} [headerStyle] - Custom header style
 * @property {object} [contentStyle] - Custom content style
 * @property {any} [data] - Custom data attached to item
 */

/**
 * @typedef {Object} AccordionEventHandlers
 * @property {Function} [onOpen]
 * @property {Function} [onClose]
 * @property {Function} [onToggle]
 * @property {Function} [onAnimationStart]
 * @property {Function} [onAnimationEnd]
 * @property {Function} [onStateChange]
 */

/**
 * @typedef {Object} AccordionProps
 * @property {React.ReactNode} children - Array of accordion items
 * @property {string[]} [value] - Controlled expanded values
 * @property {string[]} [defaultValue] - Initial expanded values (uncontrolled)
 * @property {Function} [onChange] - Callback when expanded values change
 * @property {'single' | 'multiple'} [mode] - Expand mode
 * @property {boolean} [readOnly] - Whether accordion is in read-only mode
 * @property {AnimationConfig} [animation] - Animation configuration
 * @property {Function} [renderIcon] - Custom renderer for expand/collapse icon
 * @property {'left' | 'right'} [iconPosition] - Icon position
 * @property {boolean} [showSeparators] - Whether to show item separators
 * @property {React.ReactNode} [separatorComponent] - Custom separator component
 * @property {object} [separatorStyle] - Separator style
 * @property {boolean} [stickyHeaders] - Enable sticky headers
 * @property {boolean} [lazyRender] - Lazy render content
 * @property {Partial<AccordionTheme>} [theme] - Custom theme
 * @property {boolean} [darkMode] - Enable dark mode
 * @property {string} [accessibilityLabel] - Accessibility label
 * @property {string} [testID] - Test ID for testing
 * @property {Function} [onOpen]
 * @property {Function} [onClose]
 * @property {Function} [onToggle]
 * @property {Function} [onAnimationStart]
 * @property {Function} [onAnimationEnd]
 * @property {Function} [onStateChange]
 */

/**
 * @typedef {Object} AccordionRef
 * @property {Function} open - Open a specific item by value
 * @property {Function} close - Close a specific item by value
 * @property {Function} toggle - Toggle a specific item by value
 * @property {Function} expandAll - Open all items (only works in multiple mode)
 * @property {Function} collapseAll - Close all items
 * @property {Function} toggleAll - Toggle all items
 * @property {Function} getExpandedItems - Get currently expanded items
 */

/**
 * @typedef {Object} AccordionContextType
 * @property {string} mode
 * @property {boolean} readOnly
 * @property {AnimationConfig} animationConfig
 * @property {Function} [renderIcon]
 * @property {string} iconPosition
 * @property {boolean} showSeparators
 * @property {boolean} lazyRender
 * @property {AccordionTheme} [theme]
 * @property {boolean} darkMode
 * @property {Function} registerItem
 * @property {Function} unregisterItem
 * @property {Function} toggleItem
 * @property {Function} isExpanded
 * @property {Function} getItemData
 * @property {Function} [onEvent]
 */

export {};
