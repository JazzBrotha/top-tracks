//jshint esversion:6
// const artist = document.getElementById('artist');
const info = document.getElementById('info');
// const album = document.getElementById('album');
// const year = document.getElementById('year');
// const songs = document.getElementById('songs');

let ratingArr = [];

function artistAlbumHandler() {
  let albumPromise = getAlbums('Rolling Stones');

  albumPromise.then(data => {

    // Album array to store ids
    let albumIdArr = [];

    // Looping through data arr to push all album ids
    for (let album of data.albums.items) {
      albumIdArr.push(album.id);
    }

    // Get info for each album
    for (let id of albumIdArr) {
      albumInfoHandler(id);
    }

    // return albumInfoHandler(strAlbums);
  });

  albumPromise.catch(err => {
    console.log(`Could not complete action, err: ${err}`);
  });
}

function albumInfoHandler(albumId) {

  let albumInfoPromise = viewAlbumInfo(albumId);

  albumInfoPromise.then(data => {

    // Track arr to store tracks
    let trackIdArr = [];

    // Push all tracks of each album
    for (let track of data) {
      trackIdArr.push(track.id);
    }

    //Convert track arr to string to make valid request
    let trackIds = trackIdArr.join();

    trackHandler(trackIds);
  });

  albumInfoPromise.catch(err => {
    console.log(`Could not complete action, err: ${err}`);
  });

}

function trackHandler(trackIds) {
  let trackInfoPromise = getTrackRating(trackIds);
  trackInfoPromise.then(data => {
    for (let track of data) {
      ratingArr.push({track: track.name, rating: track.popularity, uri: track.uri});
    }
    ratingArr.sort(function(a,b){
      return b.rating - a.rating;
    });
    info.innerHTML = '';
    for (let obj of ratingArr) {
      info.innerHTML += `<div class="card">
      <div class="columns">
      <div class="column col-4">
                <div class="card-image">
              <a href=https://embed.spotify.com/?uri=${obj.uri} target=_blank>Play</a>
                </div>
                </div>
                <div class="column col-8">
                <div class="card-header">
                  <div class="card-title">${obj.track}</div>
                  <div class="card-subtitle">${obj.rating}</div>
                </div>
              </div>
              </div>
        </div>
    `;
    }
  });

  trackInfoPromise.catch(err => {
    console.log(`Could not complete action, err: ${err}`);
  });

}
