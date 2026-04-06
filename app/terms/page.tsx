import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Subpricing",
  description: "Terms of service for Subpricing website",
  alternates: {
    canonical: "https://subpricing.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="glass bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-display font-bold mb-6">Terms of Service</h1>
        <p className="text-neutral-600 mb-6">Last updated: April 4, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-neutral-700 mb-3">
              By accessing and using Subpricing, you accept and agree to be bound by the terms and provision
              of this agreement. In addition, when using these particular services, you shall be subject to
              any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-neutral-700 mb-3">
              Subpricing provides pricing comparison information for various subscription services across
              different countries. We aggregate and display pricing data to help users make informed decisions
              about subscription purchases.
            </p>
            <p className="text-neutral-700 mb-3">
              <strong>Important:</strong> All prices shown are for informational purposes only. Actual prices
              may vary based on location, currency fluctuations, and service provider policies. We do not
              guarantee the accuracy of pricing information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-neutral-700 mb-3">
              As a user of this website, you agree to:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to any part of the service</li>
              <li>Not interfere with or disrupt the service or servers</li>
              <li>Not use the service to infringe upon the rights of others</li>
              <li>Verify all pricing information with official service providers before making purchases</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-neutral-700 mb-3">
              The content, organization, graphics, design, compilation, and other matters related to the site
              are protected under applicable copyrights, trademarks, and other proprietary rights. The copying,
              redistribution, use or publication by you of any such matters or any part of the site is strictly
              prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Disclaimer of Warranties</h2>
            <p className="text-neutral-700 mb-3">
              The service is provided on an "AS IS" and "AS AVAILABLE" basis. Subpricing expressly
              disclaims all warranties of any kind, whether express or implied, including, but not limited to
              the implied warranties of merchantability, fitness for a particular purpose and non-infringement.
            </p>
            <p className="text-neutral-700 mb-3">
              We make no warranty that:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>The service will meet your requirements</li>
              <li>The service will be uninterrupted, timely, secure, or error-free</li>
              <li>The results that may be obtained from the use of the service will be accurate or reliable</li>
              <li>The quality of any products, services, information, or other material purchased or obtained by you through the service will meet your expectations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-neutral-700 mb-3">
              Subpricing shall not be liable for any direct, indirect, incidental, special, consequential or
              exemplary damages, including but not limited to, damages for loss of profits, goodwill, use,
              data or other intangible losses resulting from:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>The use or the inability to use the service</li>
              <li>The cost of procurement of substitute goods and services resulting from any goods, data, information or services purchased or obtained or messages received or transactions entered into through or from the service</li>
              <li>Unauthorized access to or alteration of your transmissions or data</li>
              <li>Statements or conduct of any third party on the service</li>
              <li>Any other matter relating to the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Affiliate Links</h2>
            <p className="text-neutral-700 mb-3">
              Subpricing may use affiliate links for some services. This means we may earn a commission at no
              extra cost to you when you make a purchase through our links. These affiliate relationships help
              support the maintenance and development of this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="text-neutral-700 mb-3">
              We reserve the right to modify these terms at any time. We will do our best to notify users of
              any material changes, but it is your responsibility to review these terms periodically. Your
              continued use of the service after any changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. Governing Law</h2>
            <p className="text-neutral-700 mb-3">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction
              where Subpricing is operated, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">10. Contact Information</h2>
            <p className="text-neutral-700 mb-3">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:contact@subpricing.com" className="text-primary-500 hover:underline">
                contact@subpricing.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
