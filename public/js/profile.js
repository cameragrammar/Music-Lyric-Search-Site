let form = document.getElementById("searchBar");

function submitHandler(event) {
    event.preventDefault();
    const query = event.target.elements.searchArtist.value;
    window.location.href = (`http://localhost:3001/profile?search=${query}`);
}

searchBar.addEventListener("submit", submitHandler);

function showArtist(event) {
    const artist = event.target.innerText;
    const endIndex = window.location.href.indexOf("&");
    if (endIndex == -1)
        window.location.href += (`&artist=${artist}`);
    else
        window.location.href = window.location.href.slice(0, endIndex) + (`&artist=${artist}`);
}

const artistButtons = document.getElementsByClassName("artist-button");
for (const button of artistButtons) {
    button.addEventListener("click", showArtist);
}

function showTrack(event) {
    const track = event.target.innerText;
    const artist = event.target.getAttribute("data-artist");
    const endIndex = window.location.href.indexOf("&");
    if (endIndex == -1)
        window.location.href += (`&artist=${artist}&track=${track}`);
    else
        window.location.href = window.location.href.slice(0, endIndex) + (`&artist=${artist}&track=${track}`);
}

const trackButtons = document.getElementsByClassName("track-button");
for (const button of trackButtons) {
    button.addEventListener("click", showTrack);
}
