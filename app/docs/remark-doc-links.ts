import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/**
 * The design record cross-references itself 611 times, and every one is
 * written as prose in backticks — `aliasing.md` — rather than as a markdown
 * link. On GitHub they render as inert code spans.
 *
 * This turns each one into a link, which is the single biggest difference
 * between reading the record here and reading it there. It only rewrites
 * names that exist, so a reference to a file that has been renamed stays
 * visibly plain instead of becoming a dead link.
 */
export function remarkDocLinks(slugs: string[]) {
	const known = new Set(slugs);

	return () => (tree: Root) => {
		visit(tree, "inlineCode", (node, index, parent) => {
			if (!parent || index === undefined) return;

			const match = /^([a-z][a-z0-9-]*)\.md$/.exec(node.value);
			if (!match || !known.has(match[1])) return;

			parent.children[index] = {
				type: "link",
				url: `/docs/${match[1]}`,
				children: [{ type: "inlineCode", value: node.value }],
			};
		});
	};
}
