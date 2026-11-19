import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Elp programming language",
		short_name: "Elp",
		description: "One language for native apps on every platform.",
		start_url: "/",
		display: "browser",
		background_color: "#ffffff",
		theme_color: "#326cae",
		icons: [
			{ src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
			{ src: "/icon-512.png", sizes: "512x512", type: "image/png" },
		],
	};
}
