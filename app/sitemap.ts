import type { MetadataRoute } from "next";
import { SITE } from "./site";
import { docSlugs } from "./docs/docs";

export const dynamic = "force-static";

// lastModified is when the page's content last changed. The home page is set
// by hand; a doc page's is the day its submodule revision was pinned, which
// is as precise as a static build can be without reading git history.
const PINNED = "2026-11-19";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: SITE, lastModified: PINNED, changeFrequency: "weekly", priority: 1 },
		{ url: `${SITE}/docs`, lastModified: PINNED, changeFrequency: "weekly", priority: 0.9 },
		...docSlugs().map((slug) => ({
			url: `${SITE}/docs/${slug}`,
			lastModified: PINNED,
			changeFrequency: "weekly" as const,
			priority: 0.8,
		})),
	];
}
