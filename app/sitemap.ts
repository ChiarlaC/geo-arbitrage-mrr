import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://subpricing.com";

  const countries = [
    "turkey",
    "argentina",
    "nigeria",
    "egypt",
    "pakistan",
    "philippines",
    "india",
    "brazil",
    "poland",
    "colombia",
  ];

  const services = [
    "netflix",
    "spotify",
    "youtube-premium",
    "disney-plus",
    "hbo-max",
    "apple-music",
  ];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ai-pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const countryPages: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${baseUrl}/country/${country}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const serviceCountryPages: MetadataRoute.Sitemap = services.flatMap((service) =>
    countries.map((country) => ({
      url: `${baseUrl}/${service}/${country}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }))
  );

  return [
    ...staticRoutes,
    ...countryPages,
    ...serviceCountryPages,
  ];
}
