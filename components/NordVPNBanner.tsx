export default function NordVPNBanner() {
  return (
    <div className="w-full bg-gray-50 py-6 mt-12">
      <div className="container mx-auto px-4">
        <a
          href="https://nordvpn.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <picture>
            <source media="(min-width: 768px)" srcSet="/affiliates/nordvpn-970x250.png" />
            <img
              src="/affiliates/nordvpn-728x90.png"
              alt="NordVPN Special Offer - Save up to 74%"
              className="mx-auto rounded-lg shadow-md hover:shadow-xl transition-shadow"
            />
          </picture>
        </a>
        <p className="text-xs text-gray-500 text-center mt-3">
          Affiliate link · We may earn a commission at no extra cost to you
        </p>
      </div>
    </div>
  );
}
