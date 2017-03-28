//jshint esversion:6
// const artist = document.getElementById('artist');

// // const year = document.getElementById('year');
// // const songs = document.getElementById('songs');
//

function displaySongs(tracks) {
       info.innerHTML = '';
       tracks.forEach(track => {
       info.innerHTML += `
            <div class="column col-2">
              <div class="card">
              <div class="thumb">
              <a href="${track.external_urls.spotify}" target="_blank">
              <span class="play">&#9658;</span>
              <div class="overlay"></div>
              </a>
                <div class="card-header">
                  <div class="card-title text-center">${track.name}</div>
                  <div class="pt-20 clearfix">
                  <div class="bar">
              <div class="bar-item bar-item-green" style="width:${track.popularity}%;">${track.popularity}</div>
            </div>
          </div>
          <div class="pt-20 clearfix">
                <div class="card-image">
  <img class="img-responsive" src="${track.album.images[1].url}">
</div>
                </div>
                </div>
              </div>
              </div>
     `;
   });

   return loader.classList.remove('loading');
 }


async function getTopRatedTracks() {

  loader.classList.add('loading');

  let artist = searchField.value;

  let albums = await getAlbums(artist);

  if (albums.length < 1) {
    info.innerHTML = '';
    errorMessage.innerHTML = `<h2>Sorry, no albums found for "${artist}"</h2>`
    return loader.classList.remove('loading');
  }

  else {
    errorMessage.innerHTML = '';
    let trackList = [];


    for (let album of albums) {
      if (album.artists[0].name.toLowerCase() === artist.toLowerCase()) {
      let trackIds = await viewAlbumInfo(album.id);
      let tracks = await getTrackRating(trackIds.join());
      trackList.push(tracks);
      }
    }

    let flatten = trackList.reduce((cur, prev) => cur.concat(prev));

    let ratingArr = flatten.sort(function(a,b)  {
      return b.popularity - a.popularity;
    });

    let finalArr = ratingArr.filter((track, index) => {
      if(index < 51)
        return track;
    });

    return displaySongs(finalArr);
    }
}
