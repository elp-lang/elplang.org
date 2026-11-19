/**
 * A small, static Elp highlighter. Good enough for the design record and the
 * samples on the front page; a real grammar (Shiki with a TextMate grammar)
 * is what the book will want.
 *
 * Extracted from `code-sample.tsx` so the rendered docs can use the same one
 * — two highlighters for one language would drift the first time the
 * language changed.
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
	"while",
	"loop",
	"break",
	"continue",
	"match",
	"interface",
	"object",
	"enum",
	"pure",
	"realtime",
	"indirect",
	"component",
	"stylesheet",
	"effect",
	"defer",
	"implements",
	"by",
	"nil",
	"with",
	"as",
	"quote",
	"throw",
	"background",
]);

const TOKEN = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(@[A-Za-z_]+)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|(.)/gm;

export function highlight(source: string) {
	const out: React.ReactNode[] = [];
	let match: RegExpExecArray | null;
	let i = 0;
	TOKEN.lastIndex = 0;
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
