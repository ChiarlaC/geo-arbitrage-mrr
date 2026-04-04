import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Subpricing | Global Subscription Price Tracker",
  description: "Learn about Subpricing's mission to help users save money on subscriptions by comparing prices across different countries.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="glass bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-display font-bold mb-6">About Subpricing</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-neutral-700 mb-3">
              Subpricing was founded with a simple mission: to help people save money on subscription services
              by leveraging global price differences. We believe that everyone should have access to affordable
              digital services, regardless of where they live.
            </p>
            <p className="text-neutral-700">
              Our platform aggregates pricing data from various subscription services across different countries,
              providing transparent comparisons that empower users to make informed purchasing decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <p className="text-neutral-700 mb-3">
              We track subscription prices for popular services like Netflix, Spotify, YouTube Premium,
              Disney+, Canva Pro, and Tidal across multiple countries. Our data is updated regularly to
              ensure accuracy.
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li><strong>Price Comparison:</strong> See how much you can save by purchasing subscriptions in different countries</li>
              <li><strong>Real-time Data:</strong> Our pricing information is updated as frequently as possible</li>
              <li><strong>Step-by-Step Guides:</strong> We provide detailed instructions on how to purchase subscriptions from different regions</li>
              <li><strong>AI Pricing Insights:</strong> Compare costs for various AI models and APIs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Our Data Sources</h2>
            <p className="text-neutral-700 mb-3">
              We collect pricing information from multiple sources:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>Official service provider websites</li>
              <li>User-submitted price reports (verified)</li>
              <li>Currency exchange rate APIs</li>
              <li>Publicly available pricing databases</li>
            </ul>
            <p className="text-neutral-700 mt-3">
              While we strive for accuracy, prices may vary based on location, currency fluctuations,
              and promotional offers. Always verify prices with the official service provider before
              making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Transparency & Ethics</h2>
            <p className="text-neutral-700 mb-3">
              We believe in complete transparency about our business model and data practices:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li><strong>Affiliate Links:</strong> Some links on our site are affiliate links, which means we may earn a commission at no extra cost to you. This helps support our operations.</li>
              <li><strong>Data Privacy:</strong> We respect your privacy and are committed to protecting your personal data. Read our <Link href="/privacy" className="text-primary-500 hover:underline">Privacy Policy</Link> for details.</li>
              <li><strong>Accuracy Disclaimer:</strong> While we work hard to provide accurate information, we cannot guarantee the completeness or reliability of all data.</li>
              <li><strong>Independent Research:</strong> We are not affiliated with any subscription service providers featured on our site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-neutral-700 mb-3">
              Have questions, suggestions, or found an error in our data? We'd love to hear from you!
            </p>
            <div className="space-y-3">
              <p className="text-neutral-700">
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@subpricing.com" className="text-primary-500 hover:underline">
                  contact@subpricing.com
                </a>
              </p>
              <p className="text-neutral-700">
                <strong>GitHub:</strong>{" "}
                <a 
                  href="https://github.com/subpricing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  github.com/subpricing
                </a>
              </p>
            </div>
          </section>

          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Important Disclaimer</h3>
            <p className="text-blue-700">
              Subpricing is an informational platform only. We do not sell subscriptions directly.
              All purchases should be made through official service providers. Users are responsible
              for complying with the terms of service of each platform and any applicable laws in
              their jurisdiction.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
