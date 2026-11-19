import type { MetadataRoute } from "next";
import { SITE } from "./site";

export const dynamic = "force-static";

// lastModified is when the page's content last changed. Update it by hand.
export default function sitemap(): MetadataRoute.Sitemap {
	return [{ url: SITE, lastModified: "2026-11-19", changeFrequency: "weekly", priority: 1 }];
}
