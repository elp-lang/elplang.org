/**
 * A small, static Elp highlighter. Good enough for marketing samples; the
 * book will want a real grammar (Shiki with a TextMate grammar) instead.
 */
const KEYWORDS = new Set([
	"import",
	"from",
	"export",
	"fn",
	"var",
	"const",
	"return",
	"if",
	"else",
	"for",
	"in",
	"match",
	"interface",
	"object",
	"enum",
	"pure",
]);

const TOKEN = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(@[A-Za-z_]+)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|(.)/gm;

function highlight(source: string) {
	const out: React.ReactNode[] = [];
	let match: RegExpExecArray | null;
	let i = 0;
	while ((match = TOKEN.exec(source))) {
		const [text, comment, string, attribute, word] = match;
		const key = i++;
		if (comment) out.push(<span key={key} style={{ color: "var(--code-muted)" }}>{text}</span>);
		else if (string) out.push(<span key={key} style={{ color: "var(--code-string)" }}>{text}</span>);
		else if (attribute) out.push(<span key={key} style={{ color: "var(--code-type)" }}>{text}</span>);
		else if (word && KEYWORDS.has(word))
			out.push(<span key={key} style={{ color: "var(--code-keyword)" }}>{text}</span>);
		else if (word && /^[A-Z]/.test(word))
			out.push(<span key={key} style={{ color: "var(--code-type)" }}>{text}</span>);
		else out.push(text);
	}
	return out;
}

export default function CodeSample({ title, code }: { title: string; code: string }) {
	return (
		<figure className="flex min-w-0 flex-col overflow-hidden rounded-md border border-border">
			<figcaption className="type-micro-sm flex items-center justify-between border-b border-white/10 bg-[var(--code-bg)] px-4 py-3 text-[var(--code-muted)]">
				<span>{title}</span>
				<span>.elp</span>
			</figcaption>
			<pre className="flex-1 overflow-x-auto bg-[var(--code-bg)] px-4 py-4 font-mono text-[13px] leading-[1.7] text-[var(--code-fg)]">
				<code>{highlight(code.trim())}</code>
			</pre>
		</figure>
	);
}
