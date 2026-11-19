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

So the rule, for anyone — human or agent — working on the language: **after
a change lands in `elp-lang/elp`, run `docs:update` here and push.** It is
two commands and it is the only thing standing between a decision being
made and the site showing it.

```sh
npm run docs:update && git commit -m "Bump the elp pin" && git push
```

A build will tell you when the two have drifted in the other direction —
`app/site.ts` and the submodule's file list are checked against each other
and a mismatch **fails the build** rather than quietly publishing a page
nobody linked. It caught `control-flow.md` the first time it ran.

**Nor does pushing rebuild anything, yet.** There is no CI in this repo and
`wrangler.jsonc` carries no build configuration, so publishing is
`npm run deploy` from a machine that has the toolchain. Making a push
rebuild means either connecting Cloudflare Workers Builds to this repo (and
enabling recursive submodule checkout in it) or adding a GitHub Action.

- **The docs are rendered at `/docs`**, from `vendor/elp/docs`, with
  `app/site.ts` supplying each one's title, summary and grouping. Those two
  lists are checked against each other at build time and a mismatch **fails
  the build** — it caught `control-flow.md` missing on the first run, which
  is the drift this note used to warn about.
- `lastModified` in `app/sitemap.ts` is set by hand.
