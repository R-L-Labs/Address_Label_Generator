"use client";

import { type LabelSize, type LabelOrientation, LABEL_PADDING } from "@/lib/constants";

interface LabelPreviewProps {
  returnAddress: string;
  recipientAddress: string;
  labelSize: LabelSize;
  orientation: LabelOrientation;
}

const PX_PER_INCH = 96;

export default function LabelPreview({
  returnAddress,
  recipientAddress,
  labelSize,
  orientation,
}: LabelPreviewProps) {
  const widthPx = labelSize.width * PX_PER_INCH;
  const heightPx = labelSize.height * PX_PER_INCH;
  const padding = LABEL_PADDING * PX_PER_INCH;

  const returnFontPx = 9 * 1.333;
  const recipientFontPx = 14 * 1.333;

  const isHorizontal = orientation === "horizontal";

  const recipientLines = recipientAddress ? recipientAddress.split("\n") : [];
  const recipientBlockHeight = recipientLines.length * recipientFontPx * 1.4;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Preview
      </label>
      <div className="overflow-auto">
        <div
          id="label-preview"
          style={{
            width: widthPx,
            height: heightPx,
            padding,
            position: "relative",
            fontFamily: "Helvetica, Arial, sans-serif",
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 4,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          {/* Return address */}
          <div
            style={{
              fontSize: returnFontPx,
              lineHeight: 1.4,
              color: "#111",
              whiteSpace: "pre-wrap",
              position: "absolute",
              ...(isHorizontal
                ? {
                    bottom: padding,
                    left: padding,
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    maxHeight: "40%",
                  }
                : {
                    top: padding,
                    left: padding,
                    maxWidth: "40%",
                  }),
            }}
          >
            {returnAddress || (
              <span style={{ color: "#9ca3af" }}>Return address</span>
            )}
          </div>

          {/* Recipient address */}
          <div
            style={{
              fontSize: recipientFontPx,
              lineHeight: 1.4,
              color: "#111",
              whiteSpace: "pre-wrap",
              textAlign: "center",
              position: "absolute",
              ...(isHorizontal
                ? {
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    top: padding,
                    bottom: padding,
                    left: `calc(50% - ${recipientBlockHeight / 2}px)`,
                  }
                : {
                    top: `calc(50% - ${recipientBlockHeight / 2}px)`,
                    left: padding,
                    right: padding,
                  }),
            }}
          >
            {recipientAddress || (
              <span style={{ color: "#9ca3af" }}>Recipient address</span>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted">
        {labelSize.name} &mdash; {orientation} layout
      </p>
    </div>
  );
}
