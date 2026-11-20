import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { designAreas } from "../site";

// The design record lives in the `vendor/elp` submodule, so what this site
// renders is what was committed to the language repository at the pinned
// revision rather than a copy of it.
const REPO_DIR = join(process.cwd(), "vendor/elp");
const DOCS_DIR = join(REPO_DIR, "docs");

export type Doc = {
	slug: string;
	title: string;
	summary: string;
	area: string;
	body: string;
	/** ISO 8601, the commit that last touched the file at the pinned revision. */
	updated?: string;
};

/**
 * When each doc last changed, read from the submodule's history rather than
 * from the filesystem — an mtime records when the checkout happened, which on
 * a fresh clone is "now" for every file at once and therefore says nothing.
 *
 * One `git log` walks the whole of `docs/`; the first date a path appears
 * under is its most recent commit, because the log is newest first. These are
 * committer dates (`%cI`), so a rebase moves them and so does an amend —
 * which is right here, because what the page claims is when this revision of
 * the record came to exist, not when the prose was first written.
 */
function readUpdatedDates(): Map<string, string> {
	const dates = new Map<string, string>();

	let log = "";
	try {
		log = execFileSync("git", ["log", "--format=%x01%cI", "--name-only", "--", "docs"], {
			cwd: REPO_DIR,
			encoding: "utf8",
			maxBuffer: 32 * 1024 * 1024,
		});
	} catch {
		// Fall through to the check below; the message there is the useful one.
	}

	let commit: string | undefined;
	for (const line of log.split("\n")) {
		if (line.startsWith("\u0001")) {
			commit = line.slice(1).trim();
			continue;
		}

		const file = /^docs\/(.+)\.md$/.exec(line.trim());
		if (!file || !commit) continue;
		if (!dates.has(file[1])) dates.set(file[1], commit);
	}

	// One doc without a date is survivable: the page omits the line. Zero
	// dates means the history is not there at all — a shallow clone, or an
	// archive of the submodule rather than a checkout of it — and every page
	// would then quietly claim nothing. That fails the build, for the same
	// reason `scripts/ensure-docs.mjs` fails it.
	if (dates.size === 0) {
		throw new Error(
			[
				"",
				"No commit dates could be read from the design record.",
				"",
				`  expected: a git checkout with history at ${REPO_DIR}`,
				"",
				"A shallow clone has nothing to read. Fetch the submodule with",
				"its history, or drop the last-updated dates.",
				"",
			].join("\n"),
		);
	}

	return dates;
}

let cachedDates: Map<string, string> | undefined;

/** `allDocs` runs once per page, and the history does not move mid-build. */
function updatedDates(): Map<string, string> {
	cachedDates ??= readUpdatedDates();
	return cachedDates;
}

/**
 * Day precision, UTC, and the same string on every machine that builds the
 * site. `toLocaleDateString` with no explicit locale and zone is none of
 * those, and in a static export it bakes the builder's settings into the HTML.
 */
export function formatUpdated(iso: string): string {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const date = new Date(iso);

	return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

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
	const dates = updatedDates();

	return [...curated.entries()].map(([slug, meta]) => ({
		slug,
		...meta,
		body: readFileSync(join(DOCS_DIR, `${slug}.md`), "utf8"),
		updated: dates.get(slug),
	}));
}

/** The newest date in the record, for the index header. */
export function recordUpdated(): string | undefined {
	return [...updatedDates().values()].sort().at(-1);
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
