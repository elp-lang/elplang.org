// The site renders the design record from `vendor/elp/docs`, which is a git
// submodule. Whether a CI builder checks submodules out is not something we
// control — Cloudflare does not document it for Workers Builds — so this
// runs before every build, makes the checkout happen when it can, and fails
// loudly when it cannot.
//
// Failing loudly is the point. A build that quietly succeeds without the
// docs publishes a site missing half its content, and nothing downstream
// would notice.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const marker = join(root, "vendor/elp/docs/README.md");

if (existsSync(marker)) {
	process.exit(0);
}

console.log("vendor/elp is empty; checking the submodule out.");

try {
	execFileSync("git", ["submodule", "update", "--init", "--recursive"], {
		cwd: root,
		stdio: "inherit",
	});
} catch {
	// Fall through to the check below: the message there is the useful one.
}

if (existsSync(marker)) {
	process.exit(0);
}

console.error(
	[
		"",
		"The design record is missing and could not be checked out.",
		"",
		"  expected: vendor/elp/docs (submodule elp-lang/elp)",
		"",
		"Locally:  git submodule update --init --recursive",
		"In CI:    the builder must clone submodules. If it cannot, either",
		"          set the build command to run the checkout first, or move",
		"          to an Action that does.",
		"",
	].join("\n"),
);

process.exit(1);
