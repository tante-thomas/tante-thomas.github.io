// Loads the SoundCloud player only after a click, so the page sends no visitor data
// to SoundCloud before the visitor asks for the player (docs/brief.md, decision of
// 31 October 2026, and site/privacy.html, "SoundCloud player").

const playerSlot = document.getElementById("player-slot");
const loadPlayerButton = document.getElementById("load-player");

/** Replaces the player slot, button and notice included, with the SoundCloud iframe. */
function loadPlayer() {
  const player = document.createElement("iframe");
  player.className = "player";
  player.title = "TANTE THOMAS on SoundCloud";
  player.allow = "autoplay; encrypted-media";
  player.src = playerSlot.dataset.playerSource;
  playerSlot.replaceWith(player);
}

loadPlayerButton.addEventListener("click", loadPlayer);
