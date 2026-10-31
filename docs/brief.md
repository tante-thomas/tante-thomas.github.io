# Brief

The one-screen brief for the homepage of DJ TANTE THOMAS at https://tante-thomas.github.io. Written with Thomas on 31 October 2026.

## Goal and audience

One page that replaces Linktree in every bio. It shows current mixes, upcoming gigs and socials, and lets promoters book TANTE THOMAS.

- **Fans first.** They arrive from the Instagram bio on a phone and want to listen or see the next gig.
- **Bookers second.** Promoters and bookers find a booking section further down with a press kit: an EPK (electronic press kit), the bio, a press photo and a tech rider to download.

## Must-haves

- Dark, mobile-first single page in English. The name is always written TANTE THOMAS, set in type as a wordmark until a logo exists.
- An embedded mix player that shows new uploads by itself, plus a link to the other mix platform.
- Upcoming gigs read from a data file in the repository, one entry per gig, for example `2026-11-14, Club XY, Berlin, ticket link`. Gigs whose date has passed are hidden automatically.
- Links to [Instagram](https://www.instagram.com/tante.thomas.dj/), [SoundCloud](https://soundcloud.com/tantethomas) and [Mixcloud](https://www.mixcloud.com/TanteThomas/).
- Booking by a `mailto:` link to thomaswening94@gmail.com with a prefilled subject, for example "Booking request".
- Press kit section: the bio, a one-line genre description, a downloadable high-resolution press photo and the tech rider PDF.
- Deployed by a GitHub Actions workflow on every merge to `main`.

## Nice-to-haves

- A logo, once one exists.
- Open Graph tags (the preview card a link shows in WhatsApp or Instagram) with the press photo.
- A custom domain.

## Constraints

- No costs: GitHub Pages on the free github.io address. No paid plans.
- As little upkeep as possible: adding a gig is one line in the data file, and mixes need no change on the site.
- No build tool or framework unless a must-have needs one.

## Decisions

- Hosting on GitHub Pages, deployed through GitHub Actions (Thomas, 31 October 2026).
- The site replaces Linktree in the bios. Linktree stays as a fallback with the site as its first link (Thomas, 31 October 2026).
- Gigs come from a data file, not from Bandsintown or Resident Advisor (Thomas, 31 October 2026).
- Booking is an email link, not a form service. The address is visible to scrapers (Thomas, 31 October 2026).
- English only (Thomas, 31 October 2026).
- The SoundCloud profile player is embedded, and Mixcloud is a link. SoundCloud is the main platform: Thomas has Artist Pro there, so uploads are unlimited and the statistics are better. The concern was that listeners without an account get ads and cannot skip ahead. In a test of the embedded player in a private browser tab, a mix started, skipping ahead worked and no ad played (Thomas, 31 October 2026).

## Open decisions

- **Genre line.** Proposal: "House music for body and soul.", from Thomas's SoundCloud bio.

## Done when

- https://tante-thomas.github.io loads on a phone and the page has no horizontal scrolling at 375 px width.
- The embedded player plays the latest mix without logging in.
- A gig dated yesterday in the data file does not appear. A gig dated tomorrow does.
- Each social link opens the right profile. The first link on [Linktree](https://linktr.ee/tantethomas) opens the site.
- The booking link opens a new email to thomaswening94@gmail.com with the subject filled in.
- The press photo and the tech rider download from the page.
- A push to `main` redeploys the site without manual steps.
