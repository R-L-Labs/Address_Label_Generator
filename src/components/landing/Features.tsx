const features = [
  {
    title: "No more handwriting",
    description:
      "Stop scribbling addresses on envelopes. Paste, preview, print — done in seconds.",
  },
  {
    title: "Works with any printer",
    description:
      "Download a perfectly-sized PDF that works with Dymo, MUNBYN, Rollo, or any thermal/inkjet printer.",
  },
  {
    title: "Built for card sellers",
    description:
      "Optimized for PWE (plain white envelope) shipments — the most common format for trading card orders.",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-foreground mb-10">
          Why sellers love LabelSnap
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
