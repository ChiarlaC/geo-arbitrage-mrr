import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Subpricing",
  description: "Privacy policy for Subpricing website",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="glass bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-display font-bold mb-6">Privacy Policy</h1>
        <p className="text-neutral-600 mb-6">Last updated: April 4, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-neutral-700 mb-3">
              Welcome to Subpricing. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Data We Collect</h2>
            <p className="text-neutral-700 mb-3">
              We may collect, use, store and transfer different kinds of personal data about you which we have
              grouped together as follows:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>
                <strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version,
                time zone setting and location, browser plug-in types and versions, operating system and platform,
                and other technology on the devices you use to access this website.
              </li>
              <li>
                <strong>Usage Data:</strong> includes information about how you use our website, products and services.
              </li>
              <li>
                <strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing
                from us and your communication preferences.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. How We Use Your Data</h2>
            <p className="text-neutral-700 mb-3">
              We will only use your personal data when the law allows us to. Most commonly, we will use your
              personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-neutral-700 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features of our service when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-neutral-700 mb-3">
              We have implemented appropriate security measures to prevent your personal data from being
              accidentally lost, used or accessed in an unauthorized way, altered or disclosed. However,
              please note that no method of transmission over the Internet, or method of electronic storage
              is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Your Legal Rights</h2>
            <p className="text-neutral-700 mb-3">
              Under certain circumstances, you have rights under data protection laws in relation to your
              personal data, including the right to request access, correction, erasure, restriction, transfer,
              or to object to processing, and the right of data portability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Third-Party Links</h2>
            <p className="text-neutral-700 mb-3">
              Our service may contain links to other sites that are not operated by us. If you click on a
              third-party link, you will be directed to that third party's site. We strongly advise you to
              review the Privacy Policy of every site you visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-neutral-700 mb-3">
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
