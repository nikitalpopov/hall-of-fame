function generateVideoId() {
  if (window.location.pathname.includes("/videos")) {
    const ytPlayer = document.getElementById("ytplayer");
    const id = Math.floor(Math.random() * 200);
    if (ytPlayer) {
      ytPlayer.setAttribute("src", `https://www.youtube.com/embed/?listType=playlist&list=PLkYps93wjjiYgnzkn9nnw1FSGmHRzV9C0&index=${id}`);
    }
  }
}
