# Development

How the site is built and published. What the site must do is in the [brief](brief.md).

## Layout

- `site/` is the published website. Everything in it is public at https://tante-thomas.github.io.
- `docs/` holds the project documents. It is not published.

## Run locally

Any static file server works, for example:

```bash
python -m http.server 8000 --directory site
```

Then open http://localhost:8000.

## Deploy workflow

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) publishes `site/` to GitHub Pages.

- **When it runs:** on every push to `main`, which means every merged pull request. It can also be started by hand under Actions, "Deploy", "Run workflow".
- **What a failure blocks:** the change does not go live. The previous version of the site stays online.
- **Checks:** none. It copies `site/` as it is.

**When it fails:** open the failed run under the repository's Actions tab and read the step that is red.

| Failing step | Usual cause | Fix |
|---|---|---|
| `configure-pages` | Pages is not set to deploy from GitHub Actions | Settings, Pages, Source: "GitHub Actions" |
| `upload-pages-artifact` | `site/` is missing or empty | restore `site/index.html` |
| `deploy-pages` | a GitHub outage, or the `github-pages` environment blocks `main` | re-run the job; check Settings, Environments |
