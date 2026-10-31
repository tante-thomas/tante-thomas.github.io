# Development

How the site is built and published. What the site must do is in the [brief](brief.md).

## Layout

- `site/` is the published website. Everything in it is public at https://tante-thomas.github.io.
- `docs/` holds the project documents. It is not published.

The page is `site/index.html` with `site/style.css`. `site/gigs.js` fills the two gig lists from `site/gigs.csv`. `site/icons.svg` holds the SoundCloud, Mixcloud and Instagram icons from [Simple Icons](https://simpleicons.org), which are free to use (CC0).

## Add a gig

Add one line to [`site/gigs.csv`](../site/gigs.csv) and merge it to `main`:

```csv
2026-11-14,Club XY,Berlin,https://example.com/tickets
```

- **Fields:** date as `YYYY-MM-DD`, venue, city, ticket link. Leave the ticket link empty for no "Tickets" button, but keep the comma before it.
- **Commas:** the venue and the city may not contain a comma. The ticket link may.
- **Order:** any. The page sorts by date.
- **Past gigs:** a gig is listed under "Upcoming gigs" up to and including its date, in the visitor's time zone. From the next day it moves to "Past gigs", latest first. Keep old lines in the file: they are the list of venues played.

If the file cannot be loaded, the page says so and points to Instagram.

## Run locally

Any static file server works, for example:

```bash
python -m http.server 8000 --directory site
```

Then open http://localhost:8000.

[`.claude/launch.json`](../.claude/launch.json) holds the same command for the browser pane of the Claude desktop app. It is not part of the site.

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
