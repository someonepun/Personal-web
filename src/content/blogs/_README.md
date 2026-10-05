# Writing blog posts

Every `.md` file in this folder is a blog post. Files starting with `_` (like this
one and `_template.md`) are ignored.

## Add a post (on github.com)

1. **Images:** open `src/content/blogs/images/` → **Add file → Upload files**.
   Use lowercase names without spaces, e.g. `pca-plot.png`.
2. **Post:** open `src/content/blogs/` → **Add file → Create new file**.
   Name it e.g. `my-new-post.md` — the name becomes the URL (`#blogs/my-new-post`).
   Copy the contents of `_template.md` as a starting point.
3. **Commit** to `main`. Vercel rebuilds and the post is live in about a minute.

## The settings block

The block between the `---` lines at the top of each post:

| Field      | Required | What it does |
| ---------- | -------- | ------------ |
| `title`    | yes      | Post title |
| `date`     | yes      | `YYYY-MM-DD`; posts are listed newest first |
| `excerpt`  | no       | Short summary on the card (defaults to the first paragraph) |
| `tags`     | no       | `[Tag one, Tag two]` |
| `cover`    | no       | `./images/file.png`; without it a drawn cover is used |
| `draft`    | no       | `true` hides the post on the live site (it still shows with `npm run dev`) |
| `readTime` | no       | e.g. `6 min read`; calculated from the word count if left out |

## Images inside a post

```md
![Alt text describing the image](./images/pca-plot.png "Optional caption")
```

Images are compressed automatically when the site is built; keep the originals
reasonably sized (under ~2000px wide).
