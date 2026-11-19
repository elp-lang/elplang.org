# elplang.org

The website for [Elp](https://github.com/elp-lang/elp). For now it is a
holding page; it will host the Elp book, built from the design record in
`elp-lang/elp/docs`.

Same stack as newworld.codes and melodist.studio: Next.js static export with
Tailwind 4, served from Cloudflare Workers static assets.

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

- The design docs listed on the page come from `app/site.ts`. Keep them in
  step with `docs/` in the language repo.
- `lastModified` in `app/sitemap.ts` is set by hand.
