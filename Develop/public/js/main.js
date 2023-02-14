let form=document.getElementById("searchBar");

function submitHandler(event) {
    event.preventDefault();
    const query = event.target.elements.searchArtist.value;
    window.location.href= (`http://localhost:3001/login?search=${query}`);
   
} 

searchBar.addEventListener("submit", submitHandler);

