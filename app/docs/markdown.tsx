import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { highlight } from "../elp-highlight";
import { remarkDocLinks } from "./remark-doc-links";
import { REPO } from "../site";

/**
 * Two thirds of the code fences in the design record carry no language, and
 * they are elp — the labelled ones arrived later. So an unlabelled fence is
 * highlighted as elp, and the one `rust` fence in the record is left alone.
 */
function isElp(className: string | undefined) {
	if (!className) return true;
	return className.includes("language-elp");
}

export default function Markdown({ body, slugs }: { body: string; slugs: string[] }) {
	return (
		<div className="prose">
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkDocLinks(slugs)]}
				rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]}
				components={{
					pre: ({ children }) => <>{children}</>,

					code: ({ className, children }) => {
						const text = String(children);

						// An inline span, not a fence.
						if (!text.includes("\n") && !className) {
							return <code>{text}</code>;
						}

						return (
							<pre>
								<code>{isElp(className) ? highlight(text.replace(/\n$/, "")) : text}</code>
							</pre>
						);
					},

					// The record links to example programs by repository path.
					// Those are source rather than prose, so they stay on GitHub.
					a: ({ href, children }) => {
						const to = href ?? "";
						const external = /^https?:/.test(to);
						const example = /^examples\//.test(to);

						if (example) {
							return (
								<a href={`${REPO}/blob/main/${to}`} target="_blank" rel="noreferrer">
									{children}
								</a>
							);
						}

						return (
							<a href={to} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
								{children}
							</a>
						);
					},

					table: ({ children }) => (
						<div className="prose-table-scroll">
							<table>{children}</table>
						</div>
					),
				}}
			>
				{body}
			</ReactMarkdown>
		</div>
	);
}
