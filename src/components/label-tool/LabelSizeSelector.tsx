"use client";

import { useState } from "react";
import { LABEL_SIZES, type LabelSize, type LabelOrientation } from "@/lib/constants";

interface LabelSizeSelectorProps {
  selectedSize: LabelSize;
  onSizeChange: (size: LabelSize) => void;
  orientation: LabelOrientation;
  onOrientationChange: (orientation: LabelOrientation) => void;
}

export default function LabelSizeSelector({
  selectedSize,
  onSizeChange,
  orientation,
  onOrientationChange,
}: LabelSizeSelectorProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [customWidth, setCustomWidth] = useState(selectedSize.width.toString());
  const [customHeight, setCustomHeight] = useState(
    selectedSize.height.toString()
  );

  function handlePresetChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustom(true);
      return;
    }
    setIsCustom(false);
    const size = LABEL_SIZES[parseInt(value)];
    onSizeChange(size);
  }

  function handleCustomApply() {
    const w = parseFloat(customWidth);
    const h = parseFloat(customHeight);
    if (w > 0 && h > 0 && w <= 12 && h <= 12) {
      onSizeChange({ name: `${w}×${h} (Custom)`, width: w, height: h });
    }
  }

  const presetIndex = LABEL_SIZES.findIndex(
    (s) => s.width === selectedSize.width && s.height === selectedSize.height
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Label Size
      </label>
      <select
        value={isCustom ? "custom" : presetIndex >= 0 ? presetIndex : "custom"}
        onChange={handlePresetChange}
        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        {LABEL_SIZES.map((size, i) => (
          <option key={i} value={i}>
            {size.name}
          </option>
        ))}
        <option value="custom">Custom size...</option>
      </select>

      {isCustom && (
        <div className="flex items-end gap-2">
          <div>
            <label className="block text-xs text-muted mb-1">
              Width (in)
            </label>
            <input
              type="number"
              min="1"
              max="12"
              step="0.5"
              value={customWidth}
              onChange={(e) => setCustomWidth(e.target.value)}
              className="w-20 rounded-lg border border-border bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <span className="text-muted pb-1.5">×</span>
          <div>
            <label className="block text-xs text-muted mb-1">
              Height (in)
            </label>
            <input
              type="number"
              min="1"
              max="12"
              step="0.5"
              value={customHeight}
              onChange={(e) => setCustomHeight(e.target.value)}
              className="w-20 rounded-lg border border-border bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <button
            onClick={handleCustomApply}
            className="rounded-lg bg-accent px-3 py-1.5 text-sm text-white hover:bg-accent-hover transition-colors"
          >
            Apply
          </button>
        </div>
      )}

      <div className="pt-2">
        <label className="block text-sm font-medium text-foreground mb-2">
          Text Direction
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onOrientationChange("horizontal")}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
              orientation === "horizontal"
                ? "bg-accent text-white"
                : "border border-border text-foreground hover:bg-card"
            }`}
          >
            Horizontal
          </button>
          <button
            onClick={() => onOrientationChange("vertical")}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
              orientation === "vertical"
                ? "bg-accent text-white"
                : "border border-border text-foreground hover:bg-card"
            }`}
          >
            Vertical
          </button>
        </div>
      </div>
    </div>
  );
}
