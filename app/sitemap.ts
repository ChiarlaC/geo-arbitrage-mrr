import { MetadataRoute } from "next";

const serviceCountries: { [key: string]: string[] } = {
  "netflix":          ["turkey","argentina","nigeria","egypt","pakistan","philippines","india","brazil","poland","colombia"],
  "spotify":          ["turkey","argentina","nigeria","egypt","pakistan","philippines","india","brazil","poland","colombia"],
  "youtube-premium":  ["turkey","argentina","nigeria","egypt","pakistan","philippines","india","brazil","poland","colombia"],
  "disney-plus":      ["turkey","argentina","nigeria","egypt","pakistan","philippines","india","brazil","poland","colombia"],
  "tidal":            ["turkey","argentina","nigeria","egypt","pakistan","philippines","india","brazil","poland","colombia"],
  "canva-pro":        ["turkey","argentina","nigeria","egypt","pakistan","philippines","india","brazil","poland","colombia"],
};

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
    "tidal",
    "canva-pro",
  ];

  const guides = [
    "netflix",
    "spotify",
    "youtube-premium",
    "disney-plus",
    "canva-pro",
    "tidal",
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

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guide/${guide}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const countryPages: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${baseUrl}/country/${country}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/${service}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const serviceCountryPages: MetadataRoute.Sitemap = Object.entries(serviceCountries).flatMap(
    ([service, ctries]) =>
      ctries.map((country) => ({
        url: `${baseUrl}/${service}/${country}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
  );

  return [
    ...staticRoutes,
    ...guidePages,
    ...servicePages,
    ...countryPages,
    ...serviceCountryPages,
  ];
}
