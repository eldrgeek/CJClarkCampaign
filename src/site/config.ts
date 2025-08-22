export type SiteId = "clarke" | "alt";

export interface SiteConfig {
  id: SiteId;
  name: string;
  title: string;
  description: string;
  footerDisclaimer: string;
}

export function getCurrentSiteId(): SiteId {
  const id = (import.meta as any).env?.PUBLIC_SITE_ID || process?.env?.PUBLIC_SITE_ID || "clarke";
  return id === "alt" ? "alt" : "clarke";
}

export function getSiteConfig(): SiteConfig {
  const id = getCurrentSiteId();
  if (id === "alt") {
    return {
      id,
      name: "Jane Doe",
      title: "Jane Doe for City Council",
      description: "A Safer, Stronger Community",
      footerDisclaimer: "Paid for by Jane Doe for City Council",
    };
  }
  return {
    id: "clarke",
    name: "CJ Clarke",
    title: "CJ Clarke for City Council",
    description: "A Healthier, Safer Sheridan",
    footerDisclaimer: "Paid for by CJ Clarke for City Council",
  };
}

export function getCollectionName(base: string): string {
  const site = getCurrentSiteId();
  return site === "alt" ? `${base}_alt` : base;
}

