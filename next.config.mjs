/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const services = ['netflix', 'spotify', 'youtube-premium', 'disney-plus', 'canva-pro', 'tidal'];
    const countries = ['argentina', 'egypt', 'india', 'nigeria', 'pakistan', 'philippines', 'turkey'];
    
    // Generate all service-country redirects (42 combinations)
    const serviceRedirects = services.flatMap(service => 
      countries.map(country => ({
        source: `/${service}_${country}`,
        destination: `/${service}/${country}`,
        permanent: true
      }))
    );

    return [
      ...serviceRedirects,
      // Additional redirects for other pages
      {
        source: '/ai_api_pricing',
        destination: '/ai-pricing',
        permanent: true,
      },
      {
        source: '/guide_spotify',
        destination: '/guide/spotify',
        permanent: true,
      },
      {
        source: '/guide_youtube_premium',
        destination: '/guide/youtube-premium',
        permanent: true,
      },
      {
        source: '/guide_netflix',
        destination: '/guide/netflix',
        permanent: true,
      },
      {
        source: '/nordvpn_review',
        destination: '/review/nordvpn',
        permanent: true,
      },
      {
        source: '/privacy_policy',
        destination: '/privacy',
        permanent: true,
      },
    ];
  },
  // SEO optimization headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://go.nordvpn.net https://*.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://go.nordvpn.net; frame-src 'self' https://go.nordvpn.net; base-uri 'self'; form-action 'self';"
          }
        ]
      }
    ];
  },
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
