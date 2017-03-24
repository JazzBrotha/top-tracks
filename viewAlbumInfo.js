async function viewAlbumInfo(albumId) {
    try {
      
        // Get album info
        let track = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`);

        // Parse data
        let parsedTrack = await track.json();

        return parsedTrack.items;
    }

    //Error handler
    catch (error) {
        console.log(`Could not get album information: ${error}`);
    }
}
