import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { designAreas } from "../site";

// The design record lives in the `vendor/elp` submodule, so what this site
// renders is what was committed to the language repository at the pinned
// revision rather than a copy of it.
const DOCS_DIR = join(process.cwd(), "vendor/elp/docs");

export type Doc = {
	slug: string;
	title: string;
	summary: string;
	area: string;
	body: string;
};

function slugs(): string[] {
	return readdirSync(DOCS_DIR)
		.filter((name) => name.endsWith(".md"))
		.map((name) => name.replace(/\.md$/, ""))
		.sort();
}

/**
 * The curated title, summary and grouping live in `site.ts`; the files live
 * in the submodule. Neither is derivable from the other, so the build checks
 * them against each other rather than trusting both — this list drifted once
 * already, when a doc was added to the repository and not to the site.
 *
 * `README.md` is the docs index in the repository and is represented here by
 * the index page, so it is excluded rather than listed.
 */
function catalogue(): Map<string, { title: string; summary: string; area: string }> {
	const curated = new Map<string, { title: string; summary: string; area: string }>();

	for (const area of designAreas) {
		for (const doc of area.docs) {
			curated.set(doc.file, { title: doc.title, summary: doc.summary, area: area.area });
		}
	}

	const onDisk = new Set(slugs().filter((slug) => slug !== "README"));
	const missing = [...onDisk].filter((slug) => !curated.has(slug));
	const extra = [...curated.keys()].filter((slug) => !onDisk.has(slug));

	if (missing.length || extra.length) {
		const lines = ["The design record and app/site.ts disagree.", ""];
		if (missing.length) lines.push(`  in vendor/elp/docs, not in site.ts: ${missing.join(", ")}`);
		if (extra.length) lines.push(`  in site.ts, not in vendor/elp/docs: ${extra.join(", ")}`);
		lines.push("", "Add the entry, or bump the submodule pin.", "");
		throw new Error(lines.join("\n"));
	}

	return curated;
}

export function allDocs(): Doc[] {
	const curated = catalogue();

	return [...curated.entries()].map(([slug, meta]) => ({
		slug,
		...meta,
		body: readFileSync(join(DOCS_DIR, `${slug}.md`), "utf8"),
	}));
}

export function docSlugs(): string[] {
	return [...catalogue().keys()];
}

export function getDoc(slug: string): Doc | undefined {
	return allDocs().find((doc) => doc.slug === slug);
}

/** Groups in `site.ts`'s order, which is a reading order rather than alphabetical. */
export function docsByArea(): { area: string; docs: Doc[] }[] {
	const docs = allDocs();

	return designAreas.map((area) => ({
		area: area.area,
		docs: area.docs.map((d) => docs.find((doc) => doc.slug === d.file)!),
	}));
}
