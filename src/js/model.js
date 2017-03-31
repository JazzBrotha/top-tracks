const Model = {
    getAlbums: async function(artist) {

        try {
          
            // Fetching all albums from artist
            let albums = await fetch(`https://api.spotify.com/v1/search?q=artist:${artist}&type=album`);

            // Parse album object
            let parsedAlbums = await albums.json();

            // Create album array
            let albumArr = parsedAlbums.albums.items;

            return albumArr;
        }

        catch (error) {
            console.log(`Could not get artist information: ${error}`);
        }
    },

    getTrackIds: async function(albumId) {

        try {

            // Fetch track object from album
            let tracks = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`);

            // Parse track object
            let parsedTracks = await tracks.json();

            // Create tracklist array
            let trackList = parsedTracks.items;

            let trackIds = [];

            // Get ids from tracklist
            for (let track of trackList) {
                trackIds.push(track.id);
            }

            return trackIds;
        }

        catch (error) {
            console.log(`Could not get album information: ${error}`);
        }
    },

    getTracks: async function(trackIds) {

        try {

            // Fetch track objects
            let trackList = await fetch(`https://api.spotify.com/v1/tracks/?ids=${trackIds}`);

            // Parse track objects
            let parsedTrackList = await trackList.json();

            // Return tracks
            return parsedTrackList.tracks;
        }

        catch (error) {
            console.log(`Could not get track rating information: ${error}`);
        }
    }

}
