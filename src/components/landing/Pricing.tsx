export default function Pricing() {
  return (
    <section className="py-16 px-4 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Coming Soon: LabelSnap Pro
        </h2>
        <p className="text-muted mb-10">
          Everything you need to ship faster at scale.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free tier */}
          <div className="rounded-xl border border-border bg-white p-6 text-left">
            <div className="text-sm font-medium text-muted mb-1">Free</div>
            <div className="text-3xl font-bold text-foreground mb-4">$0</div>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex gap-2">
                <span className="text-accent">&#10003;</span>
                Single label printing
              </li>
              <li className="flex gap-2">
                <span className="text-accent">&#10003;</span>
                PDF &amp; PNG downloads
              </li>
              <li className="flex gap-2">
                <span className="text-accent">&#10003;</span>
                Custom label sizes
              </li>
              <li className="flex gap-2">
                <span className="text-accent">&#10003;</span>
                Return address saved locally
              </li>
            </ul>
          </div>

          {/* Pro tier */}
          <div className="rounded-xl border-2 border-accent bg-white p-6 text-left relative">
            <div className="absolute -top-3 left-6 bg-accent text-white text-xs font-medium px-2 py-0.5 rounded-full">
              Coming Soon
            </div>
            <div className="text-sm font-medium text-muted mb-1">Pro</div>
            <div className="text-3xl font-bold text-foreground mb-4">
              $5<span className="text-base font-normal text-muted">/mo</span>
            </div>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex gap-2">
                <span className="text-accent">&#10003;</span>
                Everything in Free
              </li>
              <li className="flex gap-2">
                <span className="text-accent">&#10003;</span>
                Batch label printing
              </li>
              <li className="flex gap-2">
                <span className="text-accent">&#10003;</span>
                Saved addresses &amp; history
              </li>
              <li className="flex gap-2">
                <span className="text-accent">&#10003;</span>
                TCGPlayer integration
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
