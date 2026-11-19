# elplang.org

The website for [Elp](https://github.com/elp-lang/elp). For now it is a
holding page; it will host the Elp book, built from the design record in
`elp-lang/elp/docs`.

Same stack as newworld.codes and melodist.studio: Next.js static export with
Tailwind 4, served from Cloudflare Workers static assets.

```sh
npm install
git submodule update --init --recursive
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm run deploy   # checkout submodules, build, publish
```

## The design record is a submodule

`vendor/elp` is the language repository, pinned to a commit, so anything the
site renders from `vendor/elp/docs` is exactly what was committed there
rather than a copy that can drift.

```sh
npm run docs:update   # move the pin to elp's current main and stage it
```

**The pin does not move on its own.** A commit in `elp-lang/elp` changes
nothing here until `docs:update` bumps the pointer and that bump is itself
committed and pushed. That is the tradeoff a submodule makes and it is the
right one for a design record: the site shows a known revision rather than
whatever main happened to be at build time.

**Nor does pushing rebuild anything, yet.** There is no CI in this repo and
`wrangler.jsonc` carries no build configuration, so publishing is
`npm run deploy` from a machine that has the toolchain. Making a push
rebuild means either connecting Cloudflare Workers Builds to this repo (and
enabling recursive submodule checkout in it) or adding a GitHub Action.

- The design docs listed on the page come from `app/site.ts`. It duplicates
  the list in `vendor/elp/docs` by hand and has drifted once; deriving it
  from the submodule is the fix.
- `lastModified` in `app/sitemap.ts` is set by hand.
