async function viewAlbumInfo(albumId) {
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
        // return parsedTrack.items;
    }

    //Error handler
    catch (error) {
        console.log(`Could not get album information: ${error}`);
    }
}
