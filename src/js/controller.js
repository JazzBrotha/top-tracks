//jshint esversion:6

const Controller = {

getTopRatedTracks: async function() {

  // Display loading symbol to inform user
  View.addClass(Elements.loader, 'loading');

  // Get name of artist from user input
  let artist = Elements.searchField.value;

  // Get all albums for artist
  let albums = await Model.getAlbums(artist);

  // Inform user if no albums was found for artist
  if (albums.length < 1) {
    View.clearHtml(Elements.info);
    View.displayErrorMessage();
    View.removeClass(Elements.loader, 'loading');
  }

  // Proceed if albums were found
  else {

    // Clear error message
    View.clearHtml(Elements.errorMessage);

    // Store all artists's tracks
    let trackList = [];

    // Get each album's tracks
    for (let album of albums) {

        // Get track ids
        let trackIds = await Model.viewAlbumInfo(album.id);

        // Get track ratings
        let tracks = await Model.getTrackRating(trackIds.join());

        // Add to trackList
        trackList.push(tracks);
      }
          // Check for exact artist match
          // if (album.artists[0].name.toLowerCase() === artist.toLowerCase()) {}

    // Reduce to single array
    let flatten = trackList.reduce((cur, prev) => cur.concat(prev));

    // Sort tracks after rating
    let ratingArr = flatten.sort(function(a,b)  {
      return b.popularity - a.popularity;
    });

    // Get top 50 tracks
    let finalArr = ratingArr.filter((track, index) => {
      if(index < 51)
        return track;
    });

    // Display tracks on page
    View.displaySongs(finalArr);
  }
}
};
