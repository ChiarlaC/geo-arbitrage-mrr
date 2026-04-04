import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://subpricing.com';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ai-pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Guide routes
  const guideServices = ['netflix', 'spotify', 'youtube-premium', 'disney-plus', 'canva-pro', 'tidal'];
  const guideRoutes = guideServices.map(service => ({
    url: `${baseUrl}/guide/${service}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic pricing routes (service/country combinations)
  const services = ['netflix', 'spotify', 'youtube-premium', 'disney-plus', 'canva-pro', 'tidal'];
  const countries = ['argentina', 'egypt', 'india', 'nigeria', 'pakistan', 'philippines', 'turkey'];
  
  const dynamicRoutes = services.flatMap(service =>
    countries.map(country => ({
      url: `${baseUrl}/${service}/${country}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }))
  );

  return [...staticRoutes, ...guideRoutes, ...dynamicRoutes];
}
