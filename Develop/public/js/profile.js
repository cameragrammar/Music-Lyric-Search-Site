// <!-- script to select a playlist and show the update form -->
// {/* <script>
//   function selectPlaylist(id) {
//     const playlists = {{ json playlists }
//   };
//   const selectedPlaylist = playlists.find(p => p.id === id);
//   document.getElementById('name').value = selectedPlaylist.name;
//   document.getElementById('selectedPlaylistId').value = selectedPlaylist.id;
//   document.getElementById('add-form').style.display = 'none';
//   document.getElementById('update-form').style.display = 'block';
//   }

//   function clearSelectedPlaylist() {
//     document.getElementById('name').value = '';
//     document.getElementById('selectedPlaylistId').value = '';
//     document.getElementById('update-form').style.display = 'none';
//     document.getElementById('add-form').style.display = 'block';
//   }
// </script> */}


const create = async (event) => {
    event.preventDefault()

    // grab name
    let name = document.querySelector('#name').value
    console.log(name)
    // verify field has data
    if (name) {
        // POST response send playlist name
        const respond = await fetch('/api/user/playlists', {
            methed: 'post',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' },
        })
        // response ok then return to '/profile' to render new playlist
        if (respond.ok) {
            // document.location.replace('/profile')
            console.log('it worked')
        } else {
            alert(respond.statusText)
        }
    } else {
        alert('youre missing a field')
    }
    // forgot a feild
}