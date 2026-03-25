"use client";

import { useEffect, useRef } from "react";

interface AddressFormProps {
  returnAddress: string;
  recipientAddress: string;
  onReturnAddressChange: (value: string) => void;
  onRecipientAddressChange: (value: string) => void;
}

const RETURN_ADDRESS_KEY = "labelsnap_return_address";

export default function AddressForm({
  returnAddress,
  recipientAddress,
  onReturnAddressChange,
  onRecipientAddressChange,
}: AddressFormProps) {
  const initialized = useRef(false);

  // Load return address from localStorage on mount
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const saved = localStorage.getItem(RETURN_ADDRESS_KEY);
      if (saved) {
        onReturnAddressChange(saved);
      }
    }
  }, [onReturnAddressChange]);

  // Persist return address to localStorage on change
  useEffect(() => {
    if (initialized.current) {
      localStorage.setItem(RETURN_ADDRESS_KEY, returnAddress);
    }
  }, [returnAddress]);

  function handleSwap() {
    const temp = returnAddress;
    onReturnAddressChange(recipientAddress);
    onRecipientAddressChange(temp);
  }

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="return-address"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Return Address
        </label>
        <textarea
          id="return-address"
          value={returnAddress}
          onChange={(e) => onReturnAddressChange(e.target.value)}
          placeholder={"John Smith\n123 Main St\nAnytown, ST 12345"}
          rows={3}
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
        />
        <p className="text-xs text-muted mt-1">
          Saved automatically for next time
        </p>
      </div>

      <button
        type="button"
        onClick={handleSwap}
        className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mx-auto"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
        </svg>
        Swap addresses
      </button>

      <div>
        <label
          htmlFor="recipient-address"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Recipient Address
        </label>
        <textarea
          id="recipient-address"
          value={recipientAddress}
          onChange={(e) => onRecipientAddressChange(e.target.value)}
          placeholder={"Jane Doe\n456 Oak Ave Apt 2B\nOthertown, ST 67890"}
          rows={4}
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
        />
      </div>
    </div>
  );
}
