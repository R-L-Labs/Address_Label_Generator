import LabelTool from "@/components/label-tool/LabelTool";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-foreground">LabelSnap</div>
          <nav className="text-sm text-muted space-x-6">
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Hero />

        {/* Label Tool — the core product, right on the landing page */}
        <section className="pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            <LabelTool />
          </div>
        </section>

        <div id="features">
          <Features />
        </div>
      </main>

      <Footer />
    </>
  );
}
