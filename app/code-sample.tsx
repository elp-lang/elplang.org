import { highlight } from "./elp-highlight";

export default function CodeSample({
	title,
	code,
	lang = ".elp",
}: {
	title: string;
	code: string;
	lang?: string;
}) {
	return (
		<figure className="flex min-w-0 flex-col overflow-hidden rounded-md border border-border">
			<figcaption className="type-micro-sm flex items-center justify-between border-b border-white/10 bg-[var(--code-bg)] px-4 py-3 text-[var(--code-muted)]">
				<span>{title}</span>
				<span>{lang}</span>
			</figcaption>
			<pre className="flex-1 overflow-x-auto bg-[var(--code-bg)] px-4 py-4 font-mono text-[13px] leading-[1.7] text-[var(--code-fg)]">
				<code>{highlight(code.trim())}</code>
			</pre>
		</figure>
	);
}
