import { useState } from "react";

export function useAccordion(defaultIndex = null) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return {
    activeIndex,
    toggle,
  };
}
