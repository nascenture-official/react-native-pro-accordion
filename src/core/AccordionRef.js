export class AccordionRefImpl {
  constructor(expandedValuesRef, setExpandedValues, mode, readOnly) {
    this.expandedValuesRef = expandedValuesRef;
    this.setExpandedValues = setExpandedValues;
    this.mode = mode;
    this.readOnly = readOnly;
  }

  open = (value) => {
    if (this.readOnly) return;

    const currentValues = this.expandedValuesRef.current;
    if (currentValues.includes(value)) return;

    let newValues;
    if (this.mode === "single") {
      newValues = [value];
    } else {
      newValues = [...currentValues, value];
    }

    this.setExpandedValues(newValues);
  };

  close = (value) => {
    if (this.readOnly) return;

    const currentValues = this.expandedValuesRef.current;
    if (!currentValues.includes(value)) return;

    const newValues = currentValues.filter((v) => v !== value);
    this.setExpandedValues(newValues);
  };

  toggle = (value) => {
    if (this.readOnly) return;

    const currentValues = this.expandedValuesRef.current;
    if (currentValues.includes(value)) {
      this.close(value);
    } else {
      this.open(value);
    }
  };

  expandAll = () => {
    if (this.readOnly || this.mode !== "multiple") return;
    console.warn("expandAll requires all item values to be known");
  };

  collapseAll = () => {
    if (this.readOnly) return;
    this.setExpandedValues([]);
  };

  toggleAll = () => {
    if (this.readOnly || this.mode !== "multiple") return;
    const currentValues = this.expandedValuesRef.current;
    if (currentValues.length > 0) {
      this.collapseAll();
    } else {
      this.expandAll();
    }
  };

  getExpandedItems = () => {
    return [...this.expandedValuesRef.current];
  };
}
