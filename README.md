# EvalSharpSite Documentation

This repository hosts the EvalSharpSite documentation website, built with [Docusaurus](https://docusaurus.io/) and published via GitHub Pages.

🔗 **Live site:** https://avironsoftware.github.io/EvalSharpSite/

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or later
- npm (bundled with Node.js) or [Yarn](https://yarnpkg.com/)

---

## Install Dependencies

Install Docusaurus and other dependencies:

```bash
npm install
```

## Build Locally

Generate the static site into the `build/` folder:

```bash
npm run build
```

---

## Publish to GitHub Pages

Deploy your changes with a single command:

```bash
npm run deploy
```

What happens under the hood:

1. Runs `npm run build` to produce the `build/` output.
2. Commits the contents of `build/` into `gh-pages` branch.
3. Pushes `gh-pages` to GitHub, from which GitHub Pages serves your site.

---

## Adding New Metric Documentation

To document an additional LLM metric, create a Markdown file in the **root** [`docs/` folder](https://github.com/AvironSoftware/EvalSharpSite/tree/main/docs):

1. Add `docs/YourMetric.md`
2. Include front-matter at the top:

   ```markdown
   ---
   id: YourMetricId
   title: Your Metric Name
   ---

   A brief description of what this metric measures and how it’s used.
   ```

Docusaurus will automatically add it to the sidebar and generate a page at `/docs/YourMetric`.
