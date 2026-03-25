"use client";

import { useState } from "react";
import { DEFAULT_LABEL_SIZE, type LabelSize, type LabelOrientation } from "@/lib/constants";
import AddressForm from "./AddressForm";
import LabelPreview from "./LabelPreview";
import LabelSizeSelector from "./LabelSizeSelector";
import DownloadButton from "./DownloadButton";

export default function LabelTool() {
  const [returnAddress, setReturnAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [labelSize, setLabelSize] = useState<LabelSize>(DEFAULT_LABEL_SIZE);
  const [orientation, setOrientation] = useState<LabelOrientation>("horizontal");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Form controls */}
      <div className="space-y-6">
        <AddressForm
          returnAddress={returnAddress}
          recipientAddress={recipientAddress}
          onReturnAddressChange={setReturnAddress}
          onRecipientAddressChange={setRecipientAddress}
        />
        <LabelSizeSelector
          selectedSize={labelSize}
          onSizeChange={setLabelSize}
          orientation={orientation}
          onOrientationChange={setOrientation}
        />
        <DownloadButton
          returnAddress={returnAddress}
          recipientAddress={recipientAddress}
          labelSize={labelSize}
          orientation={orientation}
        />
      </div>

      {/* Right: Live preview */}
      <div>
        <LabelPreview
          returnAddress={returnAddress}
          recipientAddress={recipientAddress}
          labelSize={labelSize}
          orientation={orientation}
        />
      </div>
    </div>
  );
}
