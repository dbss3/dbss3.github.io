# dominicsamra.uk

Personal website, served by GitHub Pages at <https://www.dominicsamra.uk>.
Design is [Solid State by HTML5 UP](https://html5up.net/solid-state) (CCA 3.0, see `LICENSE.txt`).

GitHub Pages builds the site with [Jekyll](https://jekyllrb.com) automatically on every push,
so there is nothing to compile by hand.

## Where things live

| To change...                              | Edit                          |
|-------------------------------------------|-------------------------------|
| Header tabs / pop-out menu entries        | `_data/navigation.yml`        |
| Projects (tabs dropdown, Projects page, home page) | `_data/projects.yml`  |
| Header, menu, `<head>`, scripts (all pages) | `_layouts/default.html`     |
| Footer / contact details (all pages)      | `_includes/footer.html`       |
| Page content                              | `index.html`, `research.html`, ... (everything below the `---` block) |
| Site-specific styling                     | `assets/css/custom.css` (leave `main.css` as the stock theme) |
| Click-to-enlarge images                   | `assets/js/lightbox.js` (automatic for content images; add `class="no-zoom"` to opt out) |

Each page starts with a small front-matter block, e.g.

```yaml
---
layout: default
title: Research
description: One-line summary used by search engines and link previews.
---
```

## Adding a new GitHub Pages project

Any repo under `github.com/dbss3` with Pages enabled is served at
`https://www.dominicsamra.uk/<RepoName>/`. To list it on the site:

1. Add a screenshot (about 800 px wide, 16:10) to `images/projects/`.
2. Add an entry to `_data/projects.yml` (name, url, repo, image, tagline, description, tags).

It then appears in the **Projects** tab dropdown, the pop-out menu, the Projects page and the home page.

## Previewing locally (optional)

```sh
gem install bundler jekyll   # needs Ruby >= 3 (e.g. `brew install ruby`)
jekyll serve                 # then open http://localhost:4000
```
