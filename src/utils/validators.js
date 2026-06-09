export const validateAnimationConfig = (config) => {
  if (config.type === "timing") {
    return !(config.duration !== undefined && config.duration <= 0);
  }

  if (config.type === "spring") {
    const { damping, mass, stiffness } = config;
    return !(
      (damping !== undefined && damping <= 0) ||
      (mass !== undefined && mass <= 0) ||
      (stiffness !== undefined && stiffness <= 0)
    );
  }

  return false;
};

export const validateAccordionMode = (mode) => {
  return mode === "single" || mode === "multiple";
};
