import Elements from './elements'
import View from './view'
import Model from './model'

export default {

    getTopRatedTracks: async function() {

        // Display loading symbol to inform user
        View.addClass(Elements.loader, 'loading');

        // Get name of artist from user input
        let artist = Elements.searchField.value;

        // Get all albums for artist
        let albums = await Model.getAlbums(artist);

        // Inform user if no albums were found for artist
        if (albums.length < 1) {
            View.clearHtml(Elements.info);
            View.displayErrorMessage(artist);
            View.removeClass(Elements.loader, 'loading');
        }

        // Proceed if albums were found
        else {

            // Clear error message
            View.clearHtml(Elements.errorMessage);

            // Store all artist's tracks
            let trackList = [];

            // Get each album's tracks
            for (let album of albums) {

                // Get track ids
                let trackIds = await Model.getTrackIds(album.id);

                // Get tracks
                let tracks = await Model.getTracks(trackIds.join());

                // Look for non exact matches
                if (album.artists[0].name.toLowerCase() === artist.toLowerCase() || album.artists[0].name.toLowerCase() === `the ${artist.toLowerCase()}`) {

                    // Add to trackList
                    trackList.push(tracks);
                }
            }

            // Inform user if tracklist is empty
            if (trackList.length < 1) {
                View.clearHtml(Elements.info);
                View.displayErrorMessage(artist);
                View.removeClass(Elements.loader, 'loading');
            }
            else {
                // Reduce to single array
                let flatten = trackList.reduce((cur, prev) => cur.concat(prev));

                // Sort tracks after rating
                let ratingArr = flatten.sort(function(a, b) {
                    return b.popularity - a.popularity;
                });

                // Get top 50 tracks
                let finalArr = ratingArr.filter((track, index) => {
                    if (index <= 50)
                        return track;
                });

                // Display tracks on page
                View.displaySongs(finalArr);
            }
        }
    }
};
