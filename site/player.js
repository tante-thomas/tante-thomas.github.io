// Loads the SoundCloud player only after a click, so the page sends no visitor data
// to SoundCloud before the visitor asks for the player (docs/brief.md, decision of
// 31 October 2026, and site/privacy.html, "SoundCloud player"). "Remove SoundCloud
// player" withdraws that consent and brings the notice back.

const playerConsent = document.getElementById("player-consent");
const loadPlayerButton = document.getElementById("load-player");
const unloadPlayerButton = document.getElementById("unload-player");

/** Returns a new SoundCloud iframe for the profile player. */
function createPlayer() {
  const player = document.createElement("iframe");
  player.className = "player";
  player.title = "TANTE THOMAS on SoundCloud";
  player.allow = "autoplay; encrypted-media";
  player.src = playerConsent.dataset.playerSource;
  return player;
}

/** Hides the notice and shows the player with the "Remove SoundCloud player" control below it. */
function loadPlayer() {
  playerConsent.after(createPlayer());
  playerConsent.hidden = true;
  unloadPlayerButton.hidden = false;
}

/** Removes the player, which ends the connection to SoundCloud, and shows the notice again. */
function unloadPlayer() {
  document.querySelector(".player").remove();
  playerConsent.hidden = false;
  unloadPlayerButton.hidden = true;
  loadPlayerButton.focus();
}

loadPlayerButton.addEventListener("click", loadPlayer);
unloadPlayerButton.addEventListener("click", unloadPlayer);
