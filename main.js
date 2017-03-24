// jshint esversion:6

const creator = document.getElementById("creator");

const AT = document.getElementById('at').innerHTML;

artistAlbumHandler();

// creator.onclick = postPlaylist;



// function postPlaylist() {
//   // fetch(`https://api.spotify.com/v1/me`).then(response=> {
//   //   console.log(response);
//   //
//   // });
//   fetch('https://api.spotify.com/v1/users/me/playlists', {
//     method: 'POST',
//     // mode: 'cors',
//     // redirect: 'follow',
//     headers: new Headers({
//     'Authorization': 'Bearer ' + AT,
//     'Content-Type': 'application/json',
//   }),
//   body:  JSON.stringify({
//     name: "New Playlist"
//   })
//   })
//   .then(function(response) {
//   console.log(`Success: ${response}`);
//   })
//   .catch(errr => {
//   console.log(`An error occured: ${err}`);
//   });
// }
