---
# Copy this file to start a new post. The new filename becomes the URL:
#   my-new-post.md  ->  yoursite.com/#blogs/my-new-post
# Files starting with "_" (like this one) are never shown on the site.

title: My New Post
date: 2026-10-05                  # YYYY-MM-DD; posts are sorted newest first
excerpt: One or two sentences shown on the blog card.
tags: [Bioinformatics, Design]
cover: ./images/my-cover.png      # optional; delete this line to use a drawn cover
draft: true                       # optional; delete this line (or set false) to publish
# readTime: 6 min read            # optional; calculated automatically if left out
---

Write the post in Markdown. The first paragraph is used as the excerpt if
`excerpt` above is left out.

## A section heading

Regular text with **bold**, *italic*, `inline code` and [a link](https://example.com).

- A bullet point
- Another one

1. A numbered step
2. Another step

> A quote or callout.

![What the image shows (used as alt text)](./images/my-figure.png "Optional caption shown under the image")

```python
import pandas as pd
counts = pd.read_csv("counts.tsv", sep="\t", index_col=0)
```

| Sample | Reads (M) | Mapped |
| ------ | --------- | ------ |
| S1     | 32.1      | 94%    |
| S2     | 29.8      | 93%    |
