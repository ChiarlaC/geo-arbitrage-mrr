import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass bg-white/60 backdrop-blur-md border-t border-white/20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-neutral-600">
            © {currentYear} Subpricing. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/about" className="text-neutral-600 hover:text-primary-500 transition-colors duration-200">
              About
            </Link>
            <Link href="/privacy" className="text-neutral-600 hover:text-primary-500 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-neutral-600 hover:text-primary-500 transition-colors duration-200">
              Terms of Service
            </Link>
            <a
              href="mailto:contact@subpricing.com"
              className="text-neutral-600 hover:text-primary-500 transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="https://github.com/subpricing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-primary-500 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
          <div className="text-xs text-neutral-500">
            Data is updated manually. Prices may vary.
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-neutral-500">
          <p>
            NordVPN is a registered trademark of Nord Security. This site uses
            affiliate links (we may earn a commission at no extra cost to you).
          </p>
        </div>
      </div>
    </footer>
  );
}
