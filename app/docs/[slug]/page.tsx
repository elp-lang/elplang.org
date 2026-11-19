import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { docSlugs, getDoc } from "../docs";
import Markdown from "../markdown";
import { REPO, SITE } from "../../site";

export const dynamic = "force-static";

export function generateStaticParams() {
	return docSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const doc = getDoc(slug);

	if (!doc) return {};

	return {
		title: doc.title,
		description: doc.summary,
		alternates: { canonical: `${SITE}/docs/${doc.slug}` },
		openGraph: { title: `${doc.title} | Elp`, description: doc.summary },
	};
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const doc = getDoc(slug);

	if (!doc) notFound();

	return (
		<main className="mx-auto w-full max-w-[1440px] px-4 md:px-12">
			<div className="flex flex-col gap-3 border-b border-border py-7 md:py-10">
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
					<Link href="/docs" className="type-micro text-muted transition-colors hover:text-fg">
						← The design record
					</Link>
					<span className="type-micro-sm text-slate">{doc.area}</span>
				</div>

				<h1 className="type-display-md text-fg">{doc.title}</h1>
				<p className="type-body max-w-[760px] leading-[1.7] text-muted">{doc.summary}</p>

				<a
					href={`${REPO}/blob/main/docs/${doc.slug}.md`}
					target="_blank"
					rel="noreferrer"
					className="type-micro self-start text-muted transition-colors hover:text-fg"
				>
					{doc.slug}.md on GitHub →
				</a>
			</div>

			<article className="py-8 md:py-12">
				<Markdown body={doc.body} slugs={docSlugs()} />
			</article>
		</main>
	);
}
