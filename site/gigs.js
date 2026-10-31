// Lists the gigs from gigs.csv in two lists: upcoming gigs, earliest first, and past gigs,
// latest first. Adding a gig is one line in that file (docs/brief.md, "As little upkeep as possible").

const GIGS_FILE = "gigs.csv";
const HEADER_LINES = 1;
const FIELDS_PER_GIG = 4; // date, venue, city, ticket link

/**
 * Splits one line of gigs.csv into a gig. The ticket link is everything after the
 * third comma, so a link may contain commas. The venue and the city may not.
 */
function parseGig(line) {
  const fields = line.split(",");
  const [date, venue, city] = fields.slice(0, FIELDS_PER_GIG - 1).map((field) => field.trim());
  const ticketLink = fields.slice(FIELDS_PER_GIG - 1).join(",").trim();
  return { date, venue, city, ticketLink };
}

/** Returns today as YYYY-MM-DD in the visitor's time zone, the format gigs.csv uses. */
function todayAsIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Returns { upcoming, past }: gigs dated today or later, earliest first, and gigs
 * dated before today, latest first. ISO dates sort as text.
 */
function splitGigsByDate(csvText) {
  const today = todayAsIsoDate();
  const gigs = csvText
    .split(/\r?\n/)
    .slice(HEADER_LINES)
    .filter((line) => line.trim() !== "")
    .map(parseGig)
    .sort((first, second) => first.date.localeCompare(second.date));
  return {
    upcoming: gigs.filter((gig) => gig.date >= today),
    past: gigs.filter((gig) => gig.date < today).reverse(),
  };
}

/** Formats 2026-11-06 as "Fri 6 Nov 2026". Noon avoids a day shift across time zones. */
function formatGigDate(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function gigListItem(gig) {
  const item = document.createElement("li");

  const date = document.createElement("time");
  date.dateTime = gig.date;
  date.textContent = formatGigDate(gig.date);

  const place = document.createElement("span");
  place.className = "gig-place";
  place.textContent = `${gig.venue}, ${gig.city}`;

  item.append(date, place);

  if (gig.ticketLink !== "") {
    const tickets = document.createElement("a");
    tickets.href = gig.ticketLink;
    tickets.textContent = "Tickets";
    item.append(tickets);
  }
  return item;
}

function showGigs({ upcoming, past }) {
  document.getElementById("gig-list").replaceChildren(...upcoming.map(gigListItem));
  document.getElementById("gig-status").textContent =
    upcoming.length === 0 ? "No gigs announced right now. Follow on Instagram for news." : "";

  document.getElementById("past-gig-list").replaceChildren(...past.map(gigListItem));
  document.getElementById("past-gigs").hidden = past.length === 0;
}

async function loadGigs() {
  try {
    const response = await fetch(GIGS_FILE, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`${GIGS_FILE} answered ${response.status}`);
    }
    showGigs(splitGigsByDate(await response.text()));
  } catch (error) {
    document.getElementById("gig-status").textContent =
      "The gig list could not be loaded. Check Instagram for upcoming dates.";
    console.error(error);
  }
}

loadGigs();
