const Model = {
  getAlbums: async function (artist) {
  try {

    // Fetching all albums from artist search
    let albums = await fetch(`https://api.spotify.com/v1/search?q=artist:${artist}&type=album`);

    // Parsing albums
    let parsedAlbums = await albums.json();

    let albumArr = parsedAlbums.albums.items;

    return albumArr;

}
  catch (error) {
      console.log(`Could not get artist information: ${error}`);
  }
},

viewAlbumInfo: async function (albumId) {
    try {

        // Get album info
        let tracks = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`);

        // Parse data
        let parsedTracks = await tracks.json();

        let trackList = parsedTracks.items;

        let trackIds = [];

        for (let track of trackList) {
          trackIds.push(track.id);
        }

        return trackIds;
    }

    //Error handler
    catch (error) {
        console.log(`Could not get album information: ${error}`);
    }
},

getTrackRating: async function (trackIds) {

  try {
    let trackList = await fetch(`https://api.spotify.com/v1/tracks/?ids=${trackIds}`);

    let parsedTrackList = await trackList.json();

    return parsedTrackList.tracks;
}

catch (error) {
    console.log(`Could not get track rating information: ${error}`);
}

}


}
