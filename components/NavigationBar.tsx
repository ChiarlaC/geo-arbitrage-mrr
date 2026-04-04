"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function NavigationBar() {
  const router = useRouter();
  const services = [
    { name: "Netflix", slug: "netflix" },
    { name: "Spotify", slug: "spotify" },
    { name: "YouTube Premium", slug: "youtube-premium" },
    { name: "Disney Plus", slug: "disney-plus" },
    { name: "Tidal", slug: "tidal" },
    { name: "Canva Pro", slug: "canva-pro" },
  ];

  const countries = [
    { name: "Turkey", slug: "turkey" },
    { name: "Argentina", slug: "argentina" },
    { name: "Nigeria", slug: "nigeria" },
    { name: "Egypt", slug: "egypt" },
    { name: "Pakistan", slug: "pakistan" },
    { name: "Philippines", slug: "philippines" },
    { name: "India", slug: "india" },
  ];

  return (
    <nav className="glass bg-white/60 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-display font-semibold tracking-tight">
              Subpricing
            </Link>
            <div className="hidden md:flex gap-4">
              <Link
                href="/"
                className="text-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Dashboard
              </Link>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="text-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200 data-[state=open]:bg-white/30">
                  Services
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="glass bg-white/90 backdrop-blur-xl rounded-xl shadow-lg min-w-[200px] p-2 border border-white/20"
                    sideOffset={5}
                  >
                    {services.map((service) => (
                      <DropdownMenu.Item
                        key={service.slug}
                        className="px-4 py-2 text-sm hover:bg-white/30 rounded-lg cursor-pointer transition-colors duration-200"
                        onSelect={() => router.push(`/${service.slug}`)}
                      >
                        {service.name}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="text-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200 data-[state=open]:bg-white/30">
                  Countries
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="glass bg-white/90 backdrop-blur-xl rounded-xl shadow-lg min-w-[200px] p-2 border border-white/20"
                    sideOffset={5}
                  >
                    {countries.map((country) => (
                      <DropdownMenu.Item
                        key={country.slug}
                        className="px-4 py-2 text-sm hover:bg-white/30 rounded-lg cursor-pointer transition-colors duration-200"
                        onSelect={() => router.push(`/country/${country.slug}`)}
                      >
                        {country.name}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
              <Link
                href="/ai-pricing"
                className="text-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                AI Pricing
              </Link>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="text-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200 data-[state=open]:bg-white/30">
                  Guides
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="glass bg-white/90 backdrop-blur-xl rounded-xl shadow-lg min-w-[200px] p-2 border border-white/20"
                    sideOffset={5}
                  >
                    <DropdownMenu.Item 
                      className="px-4 py-2 text-sm hover:bg-white/30 rounded-lg cursor-pointer transition-colors duration-200"
                      onSelect={() => router.push("/guide/netflix")}
                    >
                      Netflix Guide
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                      className="px-4 py-2 text-sm hover:bg-white/30 rounded-lg cursor-pointer transition-colors duration-200"
                      onSelect={() => router.push("/guide/spotify")}
                    >
                      Spotify Guide
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                      className="px-4 py-2 text-sm hover:bg-white/30 rounded-lg cursor-pointer transition-colors duration-200"
                      onSelect={() => router.push("/guide/youtube-premium")}
                    >
                      YouTube Premium Guide
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                      className="px-4 py-2 text-sm hover:bg-white/30 rounded-lg cursor-pointer transition-colors duration-200"
                      onSelect={() => router.push("/guide/disney-plus")}
                    >
                      Disney+ Guide
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                      className="px-4 py-2 text-sm hover:bg-white/30 rounded-lg cursor-pointer transition-colors duration-200"
                      onSelect={() => router.push("/guide/canva-pro")}
                    >
                      Canva Pro Guide
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                      className="px-4 py-2 text-sm hover:bg-white/30 rounded-lg cursor-pointer transition-colors duration-200"
                      onSelect={() => router.push("/guide/tidal")}
                    >
                      Tidal Guide
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
          <div className="flex gap-4">
              <a
                href="https://go.nordvpn.net/aff_c?offer_id=15&aff_id=143797"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-gradient-to-b from-primary-500 to-primary-600 text-white uppercase text-sm px-6 py-2 hover:shadow-xl hover:shadow-primary-500/40"
            >
              Get NordVPN
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
