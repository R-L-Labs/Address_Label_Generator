"use client";

import { type LabelSize, type LabelOrientation, LABEL_PADDING } from "@/lib/constants";

interface DownloadButtonProps {
  returnAddress: string;
  recipientAddress: string;
  labelSize: LabelSize;
  orientation: LabelOrientation;
}

export default function DownloadButton({
  returnAddress,
  recipientAddress,
  labelSize,
  orientation,
}: DownloadButtonProps) {
  const hasContent = returnAddress.trim() || recipientAddress.trim();

  async function handleDownloadPDF() {
    const { default: jsPDF } = await import("jspdf");

    const { width, height } = labelSize;
    // Always create PDF at exact physical label dimensions
    const shorter = Math.min(width, height);
    const longer = Math.max(width, height);
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [shorter, longer],
    });

    const pageW = shorter;
    const pageH = longer;

    if (orientation === "horizontal") {
      // Horizontal: text rotated 90° CCW — reads landscape on portrait label
      // With angle:90, text reads bottom-to-top. X controls vertical position
      // on the page, Y controls horizontal position. Lines stack downward via X.
      if (returnAddress.trim()) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const returnLines = returnAddress.split("\n");
        const lineH = 0.17;
        returnLines.forEach((line, i) => {
          doc.text(line, LABEL_PADDING + 0.12 + i * lineH, pageH - LABEL_PADDING, {
            angle: 90,
          });
        });
      }

      if (recipientAddress.trim()) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        const recipientLines = recipientAddress.split("\n");
        const lineH = 0.25;
        const blockH = recipientLines.length * lineH;
        const startX = pageW / 2 - blockH / 2;
        // Center horizontally on the page (Y axis when rotated)
        const centerY = pageH / 2;

        recipientLines.forEach((line, i) => {
          // Measure text width to center it along the rotated axis
          const textW = doc.getTextWidth(line);
          doc.text(line, startX + i * lineH, centerY + textW / 2, {
            angle: 90,
          });
        });
      }
    } else {
      // Vertical: text upright, standard portrait reading
      if (returnAddress.trim()) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const returnLines = returnAddress.split("\n");
        returnLines.forEach((line, i) => {
          doc.text(line, LABEL_PADDING, LABEL_PADDING + 0.12 + i * 0.17);
        });
      }

      if (recipientAddress.trim()) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        const recipientLines = recipientAddress.split("\n");
        const lineSpacing = 0.25;
        const blockHeight = recipientLines.length * lineSpacing;
        const startY = pageH / 2 - blockHeight / 2 + 0.1;

        recipientLines.forEach((line, i) => {
          doc.text(line, pageW / 2, startY + i * lineSpacing, {
            align: "center",
          });
        });
      }
    }

    doc.save("shipping-label.pdf");
  }

  async function handleDownloadPNG() {
    const { default: html2canvas } = await import("html2canvas");

    const preview = document.getElementById("label-preview");
    if (!preview) return;

    const canvas = await html2canvas(preview, {
      scale: 3, // High-res for print quality
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = "shipping-label.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleDownloadPDF}
        disabled={!hasContent}
        className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Download PDF
      </button>
      <button
        onClick={handleDownloadPNG}
        disabled={!hasContent}
        className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-card transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        PNG
      </button>
    </div>
  );
}
