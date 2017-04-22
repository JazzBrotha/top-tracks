export default {
    getAlbums: async function(artist) {

        try {

            // Fetching all albums from artist
            const albums = await fetch(`https://api.spotify.com/v1/search?q=artist:${artist}&type=album`);

            // Parse album object
            const parsedAlbums = await albums.json();

            // Create album array
            const albumArr = parsedAlbums.albums.items;

            return albumArr;
        }

        catch (error) {
            console.log(`Could not get artist information: ${error}`);
            return 'error';

        }
    },

    getTrackIds: async function(albumId) {

        try {

            // Fetch track object from album
            const tracks = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`);

            // Parse track object
            const parsedTracks = await tracks.json();

            // Create tracklist array
            const trackList = parsedTracks.items;

            let trackIds = [];

            // Get ids from tracklist
            for (const track of trackList) {
                trackIds.push(track.id);
            }

            return trackIds;
        }

        catch (error) {
            console.log(`Could not get album information: ${error}`);
            return 'error';
        }
    },

    getTracks: async function(trackIds) {

        try {

            // Fetch track objects
            const trackList = await fetch(`https://api.spotify.com/v1/tracks/?ids=${trackIds}`);

            // Parse track objects
            const parsedTrackList = await trackList.json();

            // Return tracks
            return parsedTrackList.tracks;
        }

        catch (error) {
            console.log(`Could not get track rating information: ${error}`);
            return 'error';
        }
    }

}
