function generatePlaylistId() {
  const playlists = [
    '6YPylUVqvGdjZCHZjx1eRK', // electric
    '1ya1ESCp6Ddwmd7vGUbg6n', // matryoshka
    '1YaK3jHu4gAw7IsjKAqWMn', // groovy tunes
    '5yYav5SK65hKRRC6iJxi3C', // tiger
    '76u87oiboPDaxEEWuuNlZn', // soviet
    '6P0FOkACTylNaub7NnrOOJ', // loopback
    '0ojaJFdHtsa0utaaYtqWZI', // грррлс
  ];

  if (window.location.pathname.includes("/playlist")) {
    const spotifyPlayer = document.getElementById("spotifyPlayer");
    const id = Math.floor(Math.random() * (playlists.length - 1));
    if (spotifyPlayer) {
      spotifyPlayer.setAttribute("src", `https://open.spotify.com/embed/playlist/${playlists[id]}`);
    }
  }
}
