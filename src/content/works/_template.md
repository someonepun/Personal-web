---
# Copy this file to add a work. The filename becomes the URL:
#   my-tool.md  ->  yoursite.com/#works/my-tool
# Files starting with "_" (like this one) are never shown on the site.

title: My Tool
order: 4                      # position in the list (1 = first)
status: Available             # shown as a small label, e.g. Available, Beta, Case study
price: $49                    # optional
summary: One sentence shown in the list and under the title.
cover: ./images/my-tool-cover.png   # optional card image; defaults to the first screen

# UI screenshots, shown as a swipeable gallery that opens full screen on click.
# Upload the images to src/content/works/images/ first.
screens:
  - src: ./images/my-tool-dashboard.png
    caption: Dashboard overview          # optional
  - src: ./images/my-tool-editor.png
    caption: Pipeline editor
  - ./images/my-tool-mobile.png          # a screen without a caption

features:                     # optional checklist
  - First feature
  - Second feature

cta:                          # optional button at the end
  label: Get access
  url: https://example.com

draft: true                   # optional; delete this line to publish
---

The full description, written in Markdown. Images, links, lists, code and tables
all work here, like in blog posts:

![A diagram](./images/my-tool-architecture.png "Optional caption")
