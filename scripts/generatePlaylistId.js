function generatePlaylistId() {
  if (window.location.pathname.includes("/playlist")) {
    fetch('https://gist.githubusercontent.com/nikitalpopov/ce81d908bb2341dc90ef40bca2d7772e/raw/9a7b909113b3497702493a855b4e378d5c7dc59f/playlists.json')
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
