import { DOCS, GOALS, REPO, SITE, SPONSOR, designAreas, doc } from "../site";

export const dynamic = "force-static";

// A plain-text map of the site for answer engines (llmstxt.org).
export function GET() {
	const docs = designAreas
		.flatMap((a) => a.docs.map((d) => `- [${d.title}](${doc(d.file)}) (${a.area}): ${d.summary}`))
		.join("\n");

	const body = `# Elp

> Elp is an open-source (GPL-3.0) programming language in design, inspired by
> SwiftUI and Jetpack Compose. It aims to compile one codebase to native apps
> for iOS, Android, macOS, Windows and Linux, and to HTML, CSS and JavaScript
> for the web. There is no compiler yet: the language is in a design phase.

## Links

- [Home](${SITE}): what Elp is, its goals, status and design record.
- [Repository](${REPO}): design docs and example programs.
- [Goals](${GOALS}): why Elp exists.
- [Design docs](${DOCS}): the only authority on the language today.
- [Sponsor](${SPONSOR}): New World Code Ltd, which sponsors Elp.

## Design record

${docs}

## Facts

- Name: Elp, originally Ellipsis; 'elp is English slang for "help".
- Designed by Dave Mackintosh; sponsored by New World Code Ltd (UK).
- Licence: GPL-3.0. No corporate owner; any funding will be made public.
- Status: design phase. An early Rust lexer and parser were removed deliberately.
- The Elp book, built from the design record, will be published at ${SITE}.
`;
	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
