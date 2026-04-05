interface VPNAffiliateCTAProps {
  service: string;
  eyebrow?: string;
  body?: string;
}

export default function VPNAffiliateCTA({
  service,
  eyebrow = "VPN Required",
  body = "This method requires a reliable VPN with obfuscated servers to bypass detection."
}: VPNAffiliateCTAProps) {
  // NordVPN affiliate link (update with your actual affiliate link)
  const NORDVPN_URL = "https://nordvpn.com";

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg my-8">
      <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">
        {eyebrow}
      </div>

      <h3 className="text-xl font-bold mb-2">
        Get NordVPN — Up to 76% Off + 3 Months Extra
      </h3>

      <p className="text-gray-300 text-sm mb-1">
        {body}
      </p>

      <p className="text-gray-300 text-sm mb-4">
        NordVPN's obfuscated servers mask VPN traffic as regular HTTPS, significantly improving success rate for {service}.
      </p>

      <div className="text-xs text-gray-400 mb-4">
        ★★★★★ 4.9/5 · 14M+ users · Obfuscated servers available
      </div>

      <a
        href={NORDVPN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wide px-8 py-3 rounded transition-colors"
      >
        Get NordVPN — Best Value: 2-Year Plan →
      </a>

      <div className="mt-4 text-xs text-gray-400">
        ✓ 2-year plan locks in the lowest rate · ✓ Cancel anytime
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Affiliate link · We may earn a commission at no extra cost to you
      </div>
    </div>
  );
}
