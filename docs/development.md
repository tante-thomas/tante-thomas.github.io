# Development

How the site is built and published. What the site must do is in the [brief](brief.md).

## Layout

- `site/` is the published website. Everything in it is public at https://tante-thomas.github.io.
- `docs/` holds the project documents. It is not published.

The page is `site/index.html` with `site/style.css`. `site/gigs.js` fills the two gig lists from `site/gigs.csv`. `site/player.js` inserts the SoundCloud player when the visitor clicks "Load SoundCloud player", so SoundCloud receives no visitor data before that. "Remove SoundCloud player" takes it out again. `site/press/` holds the press kit files (see [Press kit](#press-kit)). `site/impressum.html` and `site/privacy.html` are the legal notice and the privacy policy. Each page repeats the footer with links to both. `site/icons.svg` holds the SoundCloud, Mixcloud and Instagram icons from [Simple Icons](https://simpleicons.org), which are free to use (CC0).

## Press kit

The press kit in the booking section links three files in [`site/press/`](../site/press/):

| File | What it is | Used for |
|---|---|---|
| `tante-thomas-press-photo.jpg` | the press photo by Niklas Hemker, full size (6000 × 6000 px, 9.7 MB) | the "Press photo" download |
| `tante-thomas-press-photo-800.jpg` | the same photo, 800 × 800 px, JPEG quality 80 (about 85 KB) | the photo shown on the page and the link preview card |
| `tante-thomas-technical-rider.pdf` | the tech rider, one page, in German until the English version replaces it (Thomas, 31 October 2026) | the "Tech rider" download |

The bio, the genre line and the photo credit are text in `site/index.html`, in the `press-kit` block.

**Replace a file:** keep its file name, so the links and the preview tags stay valid, and merge the change to `main`.

- **New photo:** save the full-size photo as `tante-thomas-press-photo.jpg`. Save a copy 800 px wide as `tante-thomas-press-photo-800.jpg`, compressed to about 100 KB or less. Any image editor does this, for example with Pillow:

  ```bash
  python -c "from PIL import Image; Image.open('new.jpg').resize((800, 800)).save('site/press/tante-thomas-press-photo-800.jpg', quality=80, optimize=True)"
  ```

  If the new photo is not square, change the size in `resize`, the `width` and `height` of the `<img>` and the `og:image:width` and `og:image:height` tags in `site/index.html`. Update the size given next to the "Press photo" button as well, and the photo credit if the photographer changes.
- **New rider:** save it as `tante-thomas-technical-rider.pdf`. Check the page count and language next to the "Tech rider" button.

The link preview card (Open Graph and Twitter card tags in the `<head>` of `site/index.html`) points to `https://tante-thomas.github.io/press/tante-thomas-press-photo-800.jpg`. WhatsApp and other apps cache previews for days, so a new photo may show there only later.

Self-hosted images and PDFs send no visitor data to anyone but the host, so the [privacy policy](../site/privacy.html) needs no change for them.

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
