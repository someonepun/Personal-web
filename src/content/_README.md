# Editing the site's content

All text and images on the site come from the Markdown files in this folder.
Edit them on github.com (pencil icon), commit to `main`, and Vercel publishes the
change in about a minute.

```
src/content/
  site.md            Name, tagline, social links, default contact link
  pages/
    home.md          Home intro (+ optional "about" text below the settings block)
    works.md         Works page heading and intro
    services.md      Services page heading, intro and "Get in touch" button
    blogs.md         Blogs page heading and intro
  works/             One file per work      + images/ for its screenshots
  services/          One file per service   + images/
  blogs/             One file per blog post + images/
```

Files starting with `_` (templates and this guide) are never shown on the site.

## How a file is built

```md
---
title: SeqFlow Pro        <- settings block (YAML), between the --- lines
order: 2
---

The body, written in Markdown: paragraphs, ## headings, lists, **bold**,
[links](https://example.com), images, code blocks and tables.
```

- The filename is the URL: `works/seqflow-pro.md` → `#works/seqflow-pro`.
- Use lowercase file names without spaces, for posts and images alike.
- If a value contains `: ` or starts with a special character (`[`, `{`, `*`, `#`, `@`),
  wrap it in quotes: `title: "Notes: part 1"`.

## Add a work, service or blog post

1. Upload images to that folder's `images/` (**Add file → Upload files**).
2. Copy the folder's `_template.md` into a new file (**Add file → Create new file**).
3. Fill in the settings, write the body, and commit.

Each `_template.md` lists every available setting with a comment explaining it.
Highlights:

| Setting        | Where                     | What it does |
| -------------- | ------------------------- | ------------ |
| `order`        | works, services           | Position in the list (1 = first) |
| `date`         | blogs                     | `YYYY-MM-DD`; posts are listed newest first |
| `screens`      | works                     | UI screenshots shown in a gallery that opens full screen |
| `cover`        | works, blogs              | Card image (works default to the first screen; blogs to a drawn graphic) |
| `features`     | works                     | Checklist under the description |
| `deliverables` | services                  | "What you get" checklist |
| `cta`          | works, services           | Button at the end: `label` and `url` |
| `draft: true`  | works, services, blogs    | Hidden on the live site (still visible with `npm run dev`) |

## Adding UI screenshots to a work

```yaml
screens:
  - src: ./images/seqflow-dashboard.png
    caption: Run dashboard
  - src: ./images/seqflow-editor.png
    caption: Visual pipeline editor
  - ./images/seqflow-mobile.png      # caption is optional
```

Screens of any shape work (desktop, mobile, square); the gallery keeps each one's
proportions. Images are compressed automatically when the site is built; keep the
originals under ~2500px wide.
