import type { Metadata } from "next";
import Link from "next/link";
import { docsByArea, formatUpdated, recordUpdated } from "./docs";
import SectionLabel from "../section-label";
import { DOCS, SITE } from "../site";

export const dynamic = "force-static";

const description =
	"The Elp design record: the specifications that define the language, each one tested against a corpus of real programs.";

export const metadata: Metadata = {
	title: "The design record",
	description,
	alternates: { canonical: `${SITE}/docs` },
	openGraph: { title: "The design record | Elp", description },
};

export default function DocsIndex() {
	const areas = docsByArea();
	const count = areas.reduce((n, a) => n + a.docs.length, 0);
	const updated = recordUpdated();

	return (
		<main className="mx-auto w-full max-w-[1440px] px-4 md:px-12">
			<section className="flex flex-col gap-4 border-b border-border py-10 md:py-14">
				<h1 className="type-display-md md:type-display max-w-[900px] text-pretty text-fg">
					The design record.
				</h1>
				<p className="type-body max-w-[760px] leading-[1.7] text-muted">
					There is no compiler yet, so these {count} documents are the only authority
					on what Elp is. Each one records a decision and the reasoning that forced
					it, tested against a corpus of real programs — an HTTP server, a SQLite
					binding, a Vulkan triangle, a real-time audio playhead, a tree-walking
					interpreter. They are rendered here from{" "}
					<a href={DOCS} className="inline-link">
						the language repository
					</a>{" "}
					at a pinned revision, so this is what was committed rather than a copy of it.
				</p>
				{updated && (
					<p className="type-micro text-slate">
						Last change to the record{" "}
						<time dateTime={updated}>{formatUpdated(updated)}</time>
					</p>
				)}
			</section>

			{areas.map((area) => (
				<div
					key={area.area}
					className="grid gap-4 border-b border-border py-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 md:py-8"
				>
					<h2 className="type-title-sm text-fg md:pt-0.5">{area.area}</h2>
					<ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
						{area.docs.map((doc) => (
							<li key={doc.slug} className="flex flex-col gap-1">
								<Link
									href={`/docs/${doc.slug}`}
									className="type-label self-start text-fg underline decoration-border-strong underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent"
								>
									{doc.title}
								</Link>
								<p className="type-body leading-[1.6] text-muted">{doc.summary}</p>
								{doc.updated && (
									<time dateTime={doc.updated} className="type-micro-sm text-slate">
										Updated {formatUpdated(doc.updated)}
									</time>
								)}
							</li>
						))}
					</ul>
				</div>
			))}

			<div className="py-7 md:py-10">
				<SectionLabel title="Everything is open to argument" />
				<p className="type-body mt-4 max-w-[760px] leading-[1.7] text-muted">
					The most useful contribution right now is disagreement. If a decision here
					looks wrong, the reasoning that produced it is on the page — argue with
					that.
				</p>
			</div>
		</main>
	);
}
