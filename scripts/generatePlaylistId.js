function generatePlaylistId() {
  if (window.location.pathname.includes("/playlist")) {
    fetch('https://plankton-app-m6cri.ondigitalocean.app/music-reviews/playlists')
      .then(response => response.json())
      .then(playlists => {
        if (playlists.length) {
          const spotifyPlayer = document.getElementById("spotifyPlayer");
          const id = Math.floor(Math.random() * playlists.length);
          if (spotifyPlayer) {
            spotifyPlayer.setAttribute("src", `https://open.spotify.com/embed/playlist/${playlists[id]}`);
          }
        }
      });
  }
}
