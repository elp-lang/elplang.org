import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { AUTHOR_URL, DOCS_PAGE, GOALS, REPO, SITE, SPONSOR } from "./site";
import ThemeToggle from "./theme-toggle";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

// Applies a stored theme choice before first paint. Anything other than an
// explicit choice falls through to the prefers-color-scheme media query.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}`;

const title = "Elp: one language for native apps on every platform";
const description =
	"Elp is an open-source programming language in design. Inspired by SwiftUI and Jetpack Compose, it aims to compile one codebase to native apps for iOS, Android, macOS, Windows and Linux, and to the web.";

export const metadata: Metadata = {
	title: { default: title, template: "%s | Elp" },
	description,
	metadataBase: new URL(SITE),
	applicationName: "Elp",
	alternates: { canonical: SITE },
	openGraph: {
		type: "website",
		locale: "en_GB",
		url: SITE,
		siteName: "Elp",
		title,
		description,
		images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "The Elp logo" }],
	},
	twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
	icons: {
		icon: [{ url: "/favicon.png", type: "image/png" }],
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
	},
	authors: [{ name: "Dave Mackintosh", url: AUTHOR_URL }],
	creator: "Dave Mackintosh",
	publisher: "New World Code Ltd",
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
	],
};

// `internal` links are rendered with `next/link`; the rest leave the site.
const navLinks = [
	{ href: DOCS_PAGE, label: "Design docs", internal: true },
	{ href: GOALS, label: "Goals" },
	{ href: REPO, label: "GitHub" },
];

const footerLink = "type-body text-fg transition-colors hover:text-accent";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en-GB" suppressHydrationWarning>
			<body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<a href="#main-content" className="skip-to-content">
					Skip to content
				</a>
				<div className="flex min-h-screen flex-col overflow-x-hidden bg-bg font-sans">
					<header className="border-b border-border bg-bg">
						<div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-4 md:h-18 md:px-12">
							<div className="flex items-center gap-8">
								<Link href="/" className="flex items-center gap-2.5 text-fg">
									<Image src="/logo.jpg" alt="" width={28} height={28} className="rounded-[6px]" priority />
									<span className="text-[19px] font-extrabold leading-none tracking-[-0.6px]">Elp</span>
								</Link>
								<nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
									{navLinks.map((link) =>
										link.internal ? (
											<Link
												key={link.href}
												href={link.href}
												className="type-label whitespace-nowrap text-fg underline decoration-border-strong decoration-[1.5px] underline-offset-[6px] transition-colors hover:decoration-accent"
											>
												{link.label}
											</Link>
										) : (
											<a
												key={link.href}
												href={link.href}
												className="type-label whitespace-nowrap text-fg underline decoration-border-strong decoration-[1.5px] underline-offset-[6px] transition-colors hover:decoration-accent"
											>
												{link.label}
											</a>
										),
									)}
								</nav>
							</div>
							<div className="flex items-center gap-2 md:gap-4">
								<ThemeToggle />
								<a
									href={REPO}
									className="type-label hidden whitespace-nowrap rounded-md bg-accent px-3.5 py-3 text-accent-fg shadow-[var(--shadow-accent)] transition hover:brightness-105 sm:inline-block"
								>
									Star on GitHub
								</a>
							</div>
						</div>
					</header>

					<div id="main-content" className="flex-1">
						{children}
					</div>

					<footer aria-label="Site footer" className="border-t border-border">
						<div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 py-10 md:grid-cols-[minmax(0,1fr)_180px_200px] md:gap-8 md:px-12 md:py-12">
							<div className="flex max-w-[420px] flex-col gap-3">
								<div className="flex items-center gap-2.5 text-fg">
									<Image src="/logo.jpg" alt="" width={28} height={28} className="rounded-[6px]" />
									<span className="text-[19px] font-extrabold leading-none tracking-[-0.6px]">Elp</span>
								</div>
								<p className="type-body leading-[1.7] text-muted">
									Elp is designed by{" "}
									<a href={AUTHOR_URL} className="inline-link">
										Dave Mackintosh
									</a>{" "}
									and sponsored by{" "}
									<a href={SPONSOR} className="inline-link">
										New World Code
									</a>
									. Licensed under the GPL-3.0.
								</p>
							</div>
							<div className="flex flex-col gap-3">
								<h2 className="type-micro-sm text-muted">Language</h2>
								<Link href={DOCS_PAGE} className={footerLink}>
									Design docs
								</Link>
								<a href={GOALS} className={footerLink}>
									Goals
								</a>
								<a href={`${REPO}/tree/main/examples`} className={footerLink}>
									Examples
								</a>
							</div>
							<div className="flex flex-col gap-3">
								<h2 className="type-micro-sm text-muted">Community</h2>
								<a href={REPO} className={footerLink}>
									GitHub
								</a>
								<a href={`${REPO}/issues`} className={footerLink}>
									Issues and discussion
								</a>
								<a href={SPONSOR} className={footerLink}>
									New World Code
								</a>
							</div>
						</div>
					</footer>
				</div>
			</body>
		</html>
	);
}
