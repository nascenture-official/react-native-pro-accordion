/**
 * Theme type definitions for JSDoc
 */

/**
 * @typedef {Object} ThemeColors
 * @property {string} background - Background color
 * @property {string} surface - Surface/card color
 * @property {string} primary - Primary accent color
 * @property {string} text - Primary text color
 * @property {string} textSecondary - Secondary text color
 * @property {string} border - Border color
 * @property {string} disabled - Disabled state color
 * @property {string} icon - Icon color
 */

/**
 * @typedef {Object} ThemeSpacing
 * @property {number} xs - Extra small spacing (4px)
 * @property {number} sm - Small spacing (8px)
 * @property {number} md - Medium spacing (16px)
 * @property {number} lg - Large spacing (24px)
 * @property {number} xl - Extra large spacing (32px)
 */

/**
 * @typedef {Object} ThemeTypography
 * @property {Object} header - Header text style
 * @property {Object} content - Content text style
 */

/**
 * @typedef {Object} ThemeBorderRadius
 * @property {number} sm - Small border radius (4px)
 * @property {number} md - Medium border radius (8px)
 * @property {number} lg - Large border radius (12px)
 */

/**
 * @typedef {Object} CompleteAccordionTheme
 * @property {ThemeColors} colors
 * @property {ThemeSpacing} spacing
 * @property {ThemeTypography} typography
 * @property {ThemeBorderRadius} borderRadius
 */

/**
 * @typedef {Object} ThemeContextValue
 * @property {CompleteAccordionTheme} theme
 * @property {boolean} darkMode
 * @property {Function} setDarkMode
 * @property {Function} toggleDarkMode
 */

/**
 * @typedef {Object} ThemeProviderProps
 * @property {React.ReactNode} children
 * @property {Partial<CompleteAccordionTheme>} [theme]
 * @property {boolean} [darkMode]
 * @property {Function} [onDarkModeChange]
 */

export {};
