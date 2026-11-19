export const SITE = "https://elplang.org";
export const REPO = "https://github.com/elp-lang/elp";
export const DOCS = `${REPO}/tree/main/docs`;
export const GOALS = `${REPO}/blob/main/GOALS.md`;
export const EXAMPLES = `${REPO}/tree/main/examples`;
export const SPONSOR = "https://newworld.codes/open-source#elp";
export const AUTHOR_URL = "https://newworld.codes/about";

export const doc = (file: string) => `${REPO}/blob/main/docs/${file}.md`;

/**
 * The design record in elp-lang/elp/docs, grouped for reading. These become
 * chapters of the Elp book; until then each links to the source on GitHub.
 */
export const designAreas: {
	area: string;
	docs: { file: string; title: string; summary: string }[];
}[] = [
	{
		area: "Memory and ownership",
		docs: [
			{
				file: "memory-model",
				title: "Memory model",
				summary: "Ownership with var, const and references, scoped release, Buffer<T>, and how it all lowers to Rust.",
			},
			{
				file: "aliasing",
				title: "Aliasing",
				summary: "Shared, Confined and Synchronized cells, Copy, Duplicate and Move, and crossing threads safely.",
			},
		],
	},
	{
		area: "Types",
		docs: [
			{
				file: "generics",
				title: "Generics",
				summary: "Mandatory type arguments, overloading, conditional conformance and variance.",
			},
			{
				file: "interfaces",
				title: "Interfaces",
				summary: "Method-only, nominal conformance and interface dependencies.",
			},
			{
				file: "dispatch",
				title: "Dispatch",
				summary: "What an interface in a type position means, and when it is existential or universal.",
			},
			{
				file: "patterns",
				title: "Patterns",
				summary: "Destructuring, match, Optional narrowing and the pattern grammar.",
			},
		],
	},
	{
		area: "Functions and errors",
		docs: [
			{
				file: "functions",
				title: "Functions",
				summary: "The call model, methods and receivers, extension interfaces and C function pointers.",
			},
			{
				file: "operators",
				title: "Operators",
				summary: "Operators as interface methods, precedence, and narrowing through && and ||.",
			},
			{
				file: "error-handling",
				title: "Error handling",
				summary: "Errors as Either<T, E> values. No exceptions, no catch.",
			},
		],
	},
	{
		area: "Modules and the standard library",
		docs: [
			{
				file: "name-resolution",
				title: "Modules",
				summary: "Packages, imports, the prelude, the manifest and native library allow-lists.",
			},
			{
				file: "stdlib-boundary",
				title: "Standard library boundary",
				summary: "What is language, what is a privileged library, and what is plain Elp.",
			},
			{
				file: "collections",
				title: "Collections",
				summary: "Hashing, insertion-ordered Map, the iteration protocol and mutating receivers.",
			},
			{
				file: "strings",
				title: "Strings",
				summary: "UTF-8 strings, char as a scalar value, literals, escapes and why s[i] doesn't exist.",
			},
		],
	},
	{
		area: "UI and metaprogramming",
		docs: [
			{
				file: "reactivity",
				title: "Reactivity",
				summary: "Components run once, reads subscribe and writes patch.",
			},
			{
				file: "macros",
				title: "Macros",
				summary: "Macros as pure functions run at compile time over the AST.",
			},
		],
	},
	{
		area: "Tooling and process",
		docs: [
			{
				file: "diagnostics",
				title: "Diagnostics",
				summary: "Noisy by default, filtered by configuration, with a soundness floor that can't be turned off.",
			},
			{
				file: "core-language-probes",
				title: "Core language probes",
				summary: "Real programs, from an HTTP server to a Vulkan triangle, that test the design and log its gaps.",
			},
			{
				file: "grammar-script-notes",
				title: "Grammar notes",
				summary: "Intentional gaps, use-site rules and open questions in the grammar.",
			},
		],
	},
];

export const docCount = designAreas.reduce((n, a) => n + a.docs.length, 0);
