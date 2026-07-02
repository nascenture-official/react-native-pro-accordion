# react-native-pro-accordion

**A feature-rich React Native accordion component with advanced animations, full accessibility, and a powerful theme system.**

---

## ✨ Features

| Category          | Features                                                                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core**          | Single & Multiple expansion modes, Controlled & Uncontrolled state, Default expanded items, Expand/Collapse all, Disabled items, Read-only mode |
| **Animation**     | Spring & Timing animations, Custom duration & easing, Animated icons, Smooth height detection                                                   |
| **UI**            | Custom headers & content, Left/Right icon positioning, Item separators, Nested accordions, Per-item style overrides                             |
| **Theme**         | Light/Dark mode, Custom theme object, Global ThemeProvider                                                                                      |
| **Performance**   | Memoized components, Lazy rendering, Optimized via Reanimated v3                                                                                |
| **Accessibility** | VoiceOver & TalkBack, Keyboard navigation, ARIA labels, Focus management                                                                        |
| **DX**            | Full TypeScript support, Ref methods, Event callbacks, JSDoc comments                                                                           |

---

## 📦 Installation

Install directly from the local package (update the path to match your project structure):

```bash
# npm
npm install react-native-pro-accordion

# yarn
yarn add react-native-pro-accordion
```

> **Note:** This package uses [Reanimated v3](https://docs.swmansion.com/react-native-reanimated/). Make sure it is installed and configured in your project before using this library.

---

## 🚀 Quick Start

```jsx
import React from "react";
import { View, Text } from "react-native";
import { Accordion, AccordionItem } from "react-native-pro-accordion";

export default function App() {
  return (
    <Accordion mode="multiple" defaultValue={["item1"]}>
      <AccordionItem value="item1" header={<Text>Section 1</Text>}>
        <Text>Content for section 1</Text>
      </AccordionItem>

      <AccordionItem value="item2" header={<Text>Section 2</Text>}>
        <Text>Content for section 2</Text>
      </AccordionItem>
    </Accordion>
  );
}
```

---

## 📚 API Reference

### Accordion Props

| Prop                 | Type                                                              | Default                             | Description                                                  |
| -------------------- | ----------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `children`           | `ReactNode`                                                       | **Required**                        | `AccordionItem` components                                   |
| `mode`               | `'single' \| 'multiple'`                                          | `'single'`                          | Controls whether one or many items can be expanded at a time |
| `value`              | `string[]`                                                        | `undefined`                         | Controlled list of expanded item values                      |
| `defaultValue`       | `string[]`                                                        | `[]`                                | Initially expanded items (uncontrolled mode)                 |
| `onChange`           | `(values: string[]) => void`                                      | `undefined`                         | Fires when the expanded state changes                        |
| `readOnly`           | `boolean`                                                         | `false`                             | Disables all user interactions                               |
| `animation`          | `AnimationConfig`                                                 | `{ type: 'timing', duration: 300 }` | Animation configuration                                      |
| `renderIcon`         | `(props: { expanded: boolean, disabled?: boolean }) => ReactNode` | `undefined`                         | Custom icon renderer                                         |
| `iconPosition`       | `'left' \| 'right'`                                               | `'right'`                           | Position of the expand/collapse icon                         |
| `showSeparators`     | `boolean`                                                         | `false`                             | Render separators between items                              |
| `separatorComponent` | `ReactNode`                                                       | `undefined`                         | Custom separator component                                   |
| `separatorStyle`     | `ViewStyle`                                                       | `undefined`                         | Style applied to the default separator                       |
| `lazyRender`         | `boolean`                                                         | `false`                             | Only render item content when first expanded                 |
| `darkMode`           | `boolean`                                                         | `false`                             | Enable the built-in dark theme                               |
| `theme`              | `Partial<AccordionTheme>`                                         | `undefined`                         | Custom theme object                                          |
| `onOpen`             | `(value: string, data?: any) => void`                             | `undefined`                         | Called when an item opens                                    |
| `onClose`            | `(value: string, data?: any) => void`                             | `undefined`                         | Called when an item closes                                   |
| `onToggle`           | `(value: string, expanded: boolean, data?: any) => void`          | `undefined`                         | Called when an item toggles                                  |
| `onAnimationStart`   | `(value: string, expanded: boolean) => void`                      | `undefined`                         | Called when an animation begins                              |
| `onAnimationEnd`     | `(value: string, expanded: boolean) => void`                      | `undefined`                         | Called when an animation completes                           |
| `onStateChange`      | `(expandedValues: string[]) => void`                              | `undefined`                         | Called whenever expanded state changes                       |

---

### AccordionItem Props

| Prop           | Type                                                                           | Default      | Description                                      |
| -------------- | ------------------------------------------------------------------------------ | ------------ | ------------------------------------------------ |
| `value`        | `string`                                                                       | **Required** | Unique identifier for this item                  |
| `header`       | `ReactNode \| (props: { expanded: boolean, disabled?: boolean }) => ReactNode` | **Required** | Header content or render function                |
| `children`     | `ReactNode \| (props: { expanded: boolean }) => ReactNode`                     | **Required** | Expanded content or render function              |
| `disabled`     | `boolean`                                                                      | `false`      | Prevents this item from being toggled            |
| `style`        | `ViewStyle`                                                                    | `undefined`  | Style for the item container                     |
| `headerStyle`  | `ViewStyle`                                                                    | `undefined`  | Style for the header wrapper                     |
| `contentStyle` | `ViewStyle`                                                                    | `undefined`  | Style for the content wrapper                    |
| `data`         | `any`                                                                          | `undefined`  | Arbitrary data passed through to event callbacks |

---

### Accordion Ref Methods

Attach a ref to `<Accordion>` for programmatic control:

```jsx
const accordionRef = useRef(null);

// Open a specific item
accordionRef.current?.open("itemId");

// Close a specific item
accordionRef.current?.close("itemId");

// Toggle a specific item
accordionRef.current?.toggle("itemId");

// Expand all items
accordionRef.current?.expandAll();

// Collapse all items
accordionRef.current?.collapseAll();

// Toggle all items
accordionRef.current?.toggleAll();

// Returns an array of currently expanded item values
accordionRef.current?.getExpandedItems();
```

---

### Animation Configuration

#### Timing Animation

```js
{
  type: 'timing',
  duration: 300,           // Duration in milliseconds
  easing: (value) => value // Optional custom easing function
}
```

#### Spring Animation

```js
{
  type: 'spring',
  damping: 10,                       // Default: 10
  mass: 1,                           // Default: 1
  stiffness: 100,                    // Default: 100
  overshootClamping: false,
  restSpeedThreshold: 0.01,
  restDisplacementThreshold: 0.01,
}
```

---

### Theme Configuration

```js
const customTheme = {
  colors: {
    background: "#FFFFFF",
    surface: "#F5F5F5",
    primary: "#2196F3",
    text: "#000000",
    textSecondary: "#666666",
    border: "#E0E0E0",
    disabled: "#BDBDBD",
    icon: "#666666",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    header: {
      fontSize: 16,
      fontWeight: "500",
    },
    content: {
      fontSize: 14,
      lineHeight: 20,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};
```

---

## 💡 Examples

### Basic Usage

```jsx
import { Accordion, AccordionItem } from "react-native-pro-accordion";

<Accordion mode="single">
  <AccordionItem value="item1" header={<Text>Title 1</Text>}>
    <Text>Content 1</Text>
  </AccordionItem>
  <AccordionItem value="item2" header={<Text>Title 2</Text>}>
    <Text>Content 2</Text>
  </AccordionItem>
</Accordion>;
```

---

### Custom Header & Content

Use render functions to access the `expanded` state inside your header or content:

```jsx
<AccordionItem
  value="custom"
  header={({ expanded }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontWeight: expanded ? "bold" : "normal" }}>
        Custom Header
      </Text>
      <Text>{expanded ? "▼" : "▶"}</Text>
    </View>
  )}
>
  {({ expanded }) => <Text>Content is {expanded ? "visible" : "hidden"}</Text>}
</AccordionItem>
```

---

### Controlled Mode

Manage expanded state from outside the component:

```jsx
const [expandedItems, setExpandedItems] = useState(["item1"]);

<Accordion value={expandedItems} onChange={setExpandedItems} mode="multiple">
  <AccordionItem value="item1" header={<Text>Item 1</Text>}>
    <Text>Content 1</Text>
  </AccordionItem>
  <AccordionItem value="item2" header={<Text>Item 2</Text>}>
    <Text>Content 2</Text>
  </AccordionItem>
</Accordion>;
```

---

### Programmatic Control via Ref

```jsx
const accordionRef = useRef(null);

return (
  <>
    <Button
      title="Expand All"
      onPress={() => accordionRef.current?.expandAll()}
    />
    <Button
      title="Collapse All"
      onPress={() => accordionRef.current?.collapseAll()}
    />

    <Accordion ref={accordionRef} mode="multiple">
      {/* Items here */}
    </Accordion>
  </>
);
```

---

### Event Callbacks

```jsx
<Accordion
  onOpen={(value, data) => console.log("Opened:", value, data)}
  onClose={(value, data) => console.log("Closed:", value, data)}
  onToggle={(value, expanded, data) => console.log("Toggled:", value, expanded)}
>
  <AccordionItem value="item1" header={<Text>Item 1</Text>} data={{ id: 1 }}>
    <Text>Content 1</Text>
  </AccordionItem>
</Accordion>
```

---

### Nested Accordions

```jsx
<AccordionItem value="parent" header={<Text>Parent</Text>}>
  <Accordion mode="single">
    <AccordionItem value="child1" header={<Text>Child 1</Text>}>
      <Text>Child content 1</Text>
    </AccordionItem>
    <AccordionItem value="child2" header={<Text>Child 2</Text>}>
      <Text>Child content 2</Text>
    </AccordionItem>
  </Accordion>
</AccordionItem>
```

---

### Custom Styling

```jsx
<AccordionItem
  value="styled"
  header={<Text>Styled Item</Text>}
  style={styles.customItem}
  headerStyle={styles.customHeader}
  contentStyle={styles.customContent}
>
  <Text>Custom styled content</Text>
</AccordionItem>;

const styles = StyleSheet.create({
  customItem: {
    marginVertical: 8,
    borderRadius: 12,
  },
  customHeader: {
    backgroundColor: "#667eea",
    padding: 16,
  },
  customContent: {
    backgroundColor: "#f0f0ff",
    padding: 20,
  },
});
```

---

### Custom Animations

```jsx
// Spring animation
<Accordion animation={{ type: 'spring', damping: 8, stiffness: 120 }}>

// Timing animation with custom duration
<Accordion animation={{ type: 'timing', duration: 500 }}>

// Custom easing (quadratic)
<Accordion animation={{
  type: 'timing',
  duration: 400,
  easing: (value) => Math.pow(value, 2)
}}>
```

---

### Lazy Rendering

Improves performance for items with heavy content by deferring rendering until the item is first opened:

```jsx
<Accordion lazyRender>
  <AccordionItem value="lazy" header={<Text>Lazy Loaded</Text>}>
    <HeavyComponent /> {/* Only renders when expanded */}
  </AccordionItem>
</Accordion>
```

---

### Read-only Mode

```jsx
<Accordion readOnly>
  <AccordionItem value="ro" header={<Text>Read-only Item</Text>}>
    <Text>Cannot be toggled by the user.</Text>
  </AccordionItem>
</Accordion>
```

---

### Disabled Items

```jsx
<AccordionItem value="disabled" header={<Text>Disabled Item</Text>} disabled>
  <Text>This content will never show.</Text>
</AccordionItem>
```

---

## 🌗 Theme System

### Using ThemeProvider

Wrap your component tree with `ThemeProvider` for global theming:

```jsx
import {
  ThemeProvider,
  defaultLightTheme,
  defaultDarkTheme,
} from "react-native-pro-accordion";

<ThemeProvider darkMode={isDarkMode} theme={customTheme}>
  <Accordion>{/* Your accordion items */}</Accordion>
</ThemeProvider>;
```

### Inline Custom Theme

Apply a theme directly to a single `Accordion` instance:

```jsx
const myTheme = {
  colors: {
    primary: "#FF6B6B",
    background: "#FFFFFF",
    surface: "#F8F9FA",
    text: "#2C3E50",
    border: "#E1E8ED",
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
};

<Accordion theme={myTheme} darkMode={false}>
  {/* Items */}
</Accordion>;
```

---

## ♿ Accessibility

This component is built with accessibility as a first-class concern:

- **Screen readers** — Compatible with VoiceOver (iOS) and TalkBack (Android)
- **Keyboard navigation** — Full support on web targets
- **ARIA roles & labels** — Correct semantic markup
- **Focus management** — Logical focus order maintained on expand/collapse

```jsx
<Accordion accessibilityLabel="Main navigation accordion">
  <AccordionItem value="accessible" header={<Text>Accessible Item</Text>}>
    <Text>Fully accessible content</Text>
  </AccordionItem>
</Accordion>
```

---

## 📄 License

This project is under the MIT license.

---

## 🏷️ Keywords

React Native, React Native Accordion, Accordion Component, Collapsible, Expandable, Reanimated, TypeScript, Android, iOS, Accessibility, Mobile UI

---

## 👨‍💻 Author

Built with ❤️ by **Nascenture**.

- 🌐 Website: https://www.nascenture.com
- 📱 React Native Development Services: https://www.nascenture.com/react-native-app-development/
