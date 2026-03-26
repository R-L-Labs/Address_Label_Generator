"use client";

interface AddressFormProps {
  returnAddress: string;
  recipientAddress: string;
  onReturnAddressChange: (value: string) => void;
  onRecipientAddressChange: (value: string) => void;
}

export default function AddressForm({
  returnAddress,
  recipientAddress,
  onReturnAddressChange,
  onRecipientAddressChange,
}: AddressFormProps) {
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
      </div>

      <button
        type="button"
        onClick={handleSwap}
        className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mx-auto cursor-pointer"
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
