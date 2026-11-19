import CodeSample from "./code-sample";
import SectionLabel from "./section-label";
import {
	AUTHOR_URL,
	DOCS,
	EXAMPLES,
	GOALS,
	REPO,
	SITE,
	SPONSOR,
	designAreas,
	doc,
	docCount,
} from "./site";

const helloWorld = `
import { println } from "elp/stdio"

fn main {
    println("hello world")
}
`;

const helloApp = `
import { App, Window } from "elp/app"
import { Column, Row, Text } from "elp/app/components"

@App
export fn HelloWorld -> App {
    App {
        Window {
            Column {
                Row {
                    Text("Hello World")
                }
            }
        }
    }
}
`;

const goals = [
	{
		label: "01 · native",
		title: "Native everywhere",
		body: "One codebase compiled to a real native binary for iOS, Android, macOS, Windows and Linux, and to HTML, CSS and JavaScript for the web. No web views.",
	},
	{
		label: "02 · safe",
		title: "Memory and type safe",
		body: "Ownership without a garbage collector, errors as values instead of exceptions, and a soundness floor no configuration can turn off.",
	},
	{
		label: "03 · declarative",
		title: "UI in the language",
		body: "Declarative, reactive components in the spirit of SwiftUI and Jetpack Compose, as part of the language rather than a framework on top.",
	},
	{
		label: "04 · accessible",
		title: "Accessible by default",
		body: "The best accessibility standards possible, enforced by the compiler and tooling rather than left to good intentions.",
	},
	{
		label: "05 · tooled",
		title: "Batteries included",
		body: "Package management, testing with coverage, profiling and debugging with LLVM, and supply-chain management, built in.",
	},
	{
		label: "06 · open",
		title: "Owned by its community",
		body: "GPL-licensed, with no corporate owner. Any funding will be public, and the design actively avoids mechanisms that lock anyone in.",
	},
];

// Answers are short enough to be quoted directly.
const faqs = [
	{
		q: "What is Elp?",
		a: "Elp is an open-source programming language in design. It aims to let you write an app once and compile it to native code for iOS, Android, macOS, Windows and Linux, and to HTML, CSS and JavaScript for the web.",
	},
	{
		q: "Can I use Elp yet?",
		a: "Not yet. Elp is in a design phase and there is no compiler. An early Rust lexer and parser were removed on purpose, because building a compiler against a design that is still changing is rework. Implementation resumes once the design settles.",
	},
	{
		q: "What does the name mean?",
		a: "Elp started as Ellipsis. It became 'elp, which is English slang for “help”.",
	},
	{
		q: "How is Elp different from Flutter or React Native?",
		a: "Elp aims to compile to a native binary for each platform, instead of drawing its own UI or running JavaScript over a bridge. Its UI model is designed as part of the language, not a framework added on top.",
	},
	{
		q: "Who makes Elp?",
		a: "Elp is designed by Dave Mackintosh and sponsored by New World Code Ltd, a UK software company. It is licensed under the GPL-3.0 and is intended to stay community-owned.",
	},
	{
		q: "How can I get involved?",
		a: "Read the design docs on GitHub, then open an issue or a pull request. Design discussion is the most useful contribution right now.",
	},
];

const jsonLd = [
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${SITE}/#website`,
		name: "Elp",
		url: SITE,
		inLanguage: "en-GB",
		publisher: { "@type": "Organization", name: "New World Code Ltd", url: "https://newworld.codes" },
	},
	{
		"@context": "https://schema.org",
		"@type": "ComputerLanguage",
		"@id": `${SITE}/#language`,
		name: "Elp",
		alternateName: ["Ellipsis", "'elp", "elp-lang"],
		url: SITE,
		description:
			"An open-source programming language in design that aims to compile one codebase to native apps for iOS, Android, macOS, Windows and Linux, and to the web.",
		license: "https://spdx.org/licenses/GPL-3.0.html",
		sameAs: [REPO, SPONSOR],
		author: { "@type": "Person", name: "Dave Mackintosh", url: AUTHOR_URL },
	},
	{
		"@context": "https://schema.org",
		"@type": "SoftwareSourceCode",
		name: "elp",
		description: "The design record and example corpus for the Elp programming language.",
		codeRepository: REPO,
		license: "https://spdx.org/licenses/GPL-3.0.html",
		about: { "@id": `${SITE}/#language` },
		sourceOrganization: { "@type": "Organization", name: "New World Code Ltd", url: "https://newworld.codes" },
	},
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		url: SITE,
		mainEntity: faqs.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: { "@type": "Answer", text: f.a },
		})),
	},
];

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Home() {
	return (
		<>
			{jsonLd.map((d, i) => (
				<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
			))}

			{/* Fold */}
			<main className="mx-auto w-full max-w-[1440px] px-4 md:px-12">
				<section className="grid items-center gap-10 py-10 md:pb-24 md:pt-28 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
					<div className="flex flex-col gap-5 md:gap-8">
						<div className="flex items-center gap-2">
							<span className="h-2 w-2 rounded-[999px] border-[1.5px] border-accent" aria-hidden="true" />
							<p className="type-micro-sm md:type-micro text-accent">Design phase · GPL-3.0</p>
						</div>
						<h1 className="type-display-md md:type-display-xl max-w-[900px] text-pretty text-fg">
							One language for native apps on every platform.
						</h1>
						<p className="type-title max-w-[720px] leading-[1.5] text-muted">
							Elp is an open-source programming language in design. Inspired by
							SwiftUI and Jetpack Compose, it aims to compile one codebase to
							native apps for iOS, Android, macOS, Windows and Linux, and to HTML,
							CSS and JavaScript for the web.
						</p>
						<div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
							<a
								href={DOCS}
								className="type-label flex h-12 items-center justify-center rounded-md bg-accent px-4 text-accent-fg shadow-[var(--shadow-accent)] transition hover:brightness-105 md:h-auto md:py-3"
							>
								Read the design docs
							</a>
							<a
								href={GOALS}
								className="type-label flex h-12 items-center justify-center rounded-md border border-border px-4 text-fg transition-colors hover:bg-surface md:h-auto md:py-3"
							>
								Why Elp exists
							</a>
						</div>
					</div>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/logo.jpg"
						alt="The Elp logo: the word Elp in white on blue"
						width={320}
						height={320}
						className="hidden aspect-square w-full max-w-[320px] rounded-[28px] shadow-[0_24px_60px_rgb(38_87_146_/_0.35)] lg:block"
					/>
				</section>
			</main>

			{/* Code */}
			<section className="border-t border-border">
				<div className="mx-auto w-full max-w-[1440px] px-4 py-7 md:px-12 md:py-14">
					<div className="mb-6 flex items-center justify-between md:mb-10">
						<SectionLabel title="A first look" />
						<a href={EXAMPLES} className="type-micro text-muted transition-colors hover:text-fg">
							More examples →
						</a>
					</div>
					<div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
						<CodeSample title="Hello world, on the command line" code={helloWorld} />
						<CodeSample title="Hello world, as an app" code={helloApp} />
					</div>
					<p className="type-body mt-5 max-w-[760px] leading-[1.7] text-muted">
						The syntax is still being designed, so these will change. The app
						version describes its UI as nested components; the compiler turns it
						into a native app for each platform you target.
					</p>
				</div>
			</section>

			{/* Goals */}
			<section className="border-t border-border bg-surface-alt">
				<div className="mx-auto w-full max-w-[1440px] px-4 py-7 md:px-12 md:py-14">
					<SectionLabel title="Goals" count={goals.length} className="mb-6 md:mb-10" />
					<div className="grid gap-x-12 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
						{goals.map((g) => (
							<div key={g.label} className="flex flex-col gap-2 md:gap-3">
								<p className="type-micro-sm text-muted">{g.label}</p>
								<h2 className="type-title text-fg">{g.title}</h2>
								<p className="type-body leading-[1.7] text-muted">{g.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Status */}
			<section className="border-t border-border">
				<div className="mx-auto grid w-full max-w-[1440px] gap-4 px-4 py-7 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 md:px-12 md:py-14">
					<h2 className="type-micro text-muted md:pt-2">Status</h2>
					<div className="flex max-w-[760px] flex-col gap-4">
						<p className="type-display-md text-fg">Design, not implementation.</p>
						<p className="type-body leading-[1.7] text-muted">
							There is no compiler yet, on purpose. An early lexer, parser and
							syntax tree were written in Rust and then removed: a front end built
							against a design that is still moving is rework, not progress. What
							exists is the design record, {docCount} specifications each tested
							against a corpus of real programs, from an HTTP server and a SQLite
							binding to a Vulkan triangle and a real-time audio playhead.
						</p>
						<p className="type-body leading-[1.7] text-muted">
							Implementation resumes once the design settles. Until then, the most
							useful thing you can do is read the docs and argue with them.
						</p>
					</div>
				</div>
			</section>

			{/* Design record */}
			<section id="design" className="scroll-mt-4 border-t border-border">
				<div className="mx-auto w-full max-w-[1440px] px-4 md:px-12">
					<div className="flex items-center justify-between py-3.5 md:py-4.5">
						<SectionLabel title="The design record" count={docCount} />
						<a href={DOCS} className="type-micro text-muted transition-colors hover:text-fg">
							On GitHub →
						</a>
					</div>
					{designAreas.map((area) => (
						<div
							key={area.area}
							className="grid gap-4 border-t border-border py-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 md:py-8"
						>
							<h3 className="type-title-sm text-fg md:pt-0.5">{area.area}</h3>
							<ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
								{area.docs.map((d) => (
									<li key={d.file} className="flex flex-col gap-1">
										<a
											href={doc(d.file)}
											className="type-label self-start text-fg underline decoration-border-strong underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent"
										>
											{d.title}
										</a>
										<p className="type-body leading-[1.6] text-muted">{d.summary}</p>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			{/* Book */}
			<section className="border-t border-border bg-surface-alt">
				<div className="mx-auto grid w-full max-w-[1440px] gap-4 px-4 py-7 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 md:px-12 md:py-14">
					<h2 className="type-micro text-muted md:pt-2">The Elp book</h2>
					<div className="flex max-w-[760px] flex-col gap-4">
						<p className="type-display-md text-fg">Coming to this site.</p>
						<p className="type-body leading-[1.7] text-muted">
							As the design settles, the design record will become the Elp book: a
							guide to the language and its reference, published here at
							elplang.org. Until then, the docs on{" "}
							<a href={DOCS} className="inline-link">
								GitHub
							</a>{" "}
							are the only authority on what the language is.
						</p>
					</div>
				</div>
			</section>

			{/* Questions */}
			<section className="border-t border-border">
				<div className="mx-auto w-full max-w-[1440px] px-4 py-7 md:px-12 md:py-14">
					<SectionLabel title="Questions" count={faqs.length} className="mb-6 md:mb-10" />
					<div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
						{faqs.map((f) => (
							<div key={f.q} className="flex flex-col gap-2">
								<h3 id={anchor(f.q)} className="type-title scroll-mt-6 text-fg">
									{f.q}
								</h3>
								<p className="type-body max-w-[520px] leading-[1.7] text-muted">{f.a}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Get involved */}
			<section className="border-t border-border">
				<div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-7 md:flex-row md:items-center md:justify-between md:gap-12 md:px-12 md:py-14">
					<div className="flex flex-col gap-3">
						<h2 className="type-display-md md:type-display text-fg">Help shape the language.</h2>
						<p className="type-body leading-[1.7] text-muted">
							Fork it, read it, improve it and send a pull request.
						</p>
					</div>
					<a
						href={REPO}
						className="type-label flex h-12 items-center justify-center self-start rounded-md bg-accent px-5 text-accent-fg shadow-[var(--shadow-accent)] transition hover:brightness-105 md:self-auto"
					>
						github.com/elp-lang/elp
					</a>
				</div>
			</section>
		</>
	);
}
