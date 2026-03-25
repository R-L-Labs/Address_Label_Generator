export interface LabelSize {
  name: string;
  width: number;
  height: number;
}

export const LABEL_SIZES: LabelSize[] = [
  { name: "4×6 / 100×150mm (Standard Thermal)", width: 4, height: 6 },
  { name: "6×4 (Landscape Thermal)", width: 6, height: 4 },
  { name: "4×3 (Half Sheet)", width: 4, height: 3 },
];

export const DEFAULT_LABEL_SIZE = LABEL_SIZES[0];

export type LabelOrientation = "horizontal" | "vertical";

export const RETURN_ADDRESS_FONT_SIZE = 9;
export const RECIPIENT_FONT_SIZE = 14;
export const LABEL_PADDING = 0.25; // inches from edge
