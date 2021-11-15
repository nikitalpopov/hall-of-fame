function generatePlaylistId() {
  const playlists = [
    '6YPylUVqvGdjZCHZjx1eRK',
    '1ya1ESCp6Ddwmd7vGUbg6n',
    '1YaK3jHu4gAw7IsjKAqWMn',
    '5yYav5SK65hKRRC6iJxi3C'
  ];

  if (window.location.pathname.includes("/playlist")) {
    const spotifyPlayer = document.getElementById("spotifyPlayer");
    const id = Math.floor(Math.random() * (playlists.length - 1));
    if (spotifyPlayer) {
      spotifyPlayer.setAttribute("src", `https://open.spotify.com/embed/playlist/${playlists[id]}`);
    }
  }
}
