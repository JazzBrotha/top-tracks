import Elements from './elements'
import View from './view'
import Model from './model'

export default {

  getTopRatedTracks: async function () {
      // Display loading symbol to inform user
    View.addClass(Elements.loader, 'loading')

    const token = await Model.getAccess()
    View.displayLoadingMessage('Connecting to Spotify...')

    if (token !== 'Could not get access token') {
        // Get name of artist from user input
      const artist = Elements.searchField.value
      
      // Get all albums for artist
      const albums = await Model.getAlbums(artist, token)
      View.displayLoadingMessage('Fetching albums...')

      if (albums === 'error') {
        View.connectionError()
        View.removeClass(Elements.loader, 'loading')
      }
        // Inform user if no albums were found for artist
      else if (albums.length < 1) {
        View.clearHtml(Elements.info)
        View.displayErrorMessage(artist)
        View.removeClass(Elements.loader, 'loading')
      }

        // Proceed if albums were found
      else {
        // Clear error message
        View.clearHtml(Elements.errorMessage)

        // Store all artist's tracks
        let trackList = []

        View.displayLoadingMessage('Fetching tracks...')
        // Get each album's tracks
        for (const album of albums) {
          // Get track ids
          const trackIds = await Model.getTrackIds(album.id, token)

          if (trackIds === 'error') {
            View.connectionError()
            View.removeClass(Elements.loader, 'loading')
          }

          // Get tracks
          const tracks = await Model.getTracks(trackIds.join(), token)
          // console.log(tracks)
          if (tracks === 'error') {
            View.connectionError()
            View.removeClass(Elements.loader, 'loading')
          }

          // Look for non exact matches
          if (album.artists[0].name.toLowerCase() === artist.toLowerCase() || album.artists[0].name.toLowerCase() === `the ${artist.toLowerCase()}`) {
                    // Add to trackList
            trackList.push(tracks)
          }
        }

            // Inform user if tracklist is empty
        if (trackList.length < 1) {
          View.clearHtml(Elements.info)
          View.displayErrorMessage(artist)
          View.removeClass(Elements.loader, 'loading')
        } else {
          View.displayLoadingMessage('Sorting by popularity...')
          // Reduce to single array
          const flatten = trackList.reduce((cur, prev) => cur.concat(prev))
          // Sort tracks after rating
          const ratingArr = flatten.sort(function (a, b) {
            return b.popularity - a.popularity
          })
          // Get top 50 tracks
          const finalArr = ratingArr.filter((track, index) => {
            if (index <= 50) { return track }
          })

          View.clearHtml(Elements.errorMessage)
          // Display tracks on page
          View.displaySongs(finalArr)
        }
      }
    } else {
      View.connectionError()
      View.removeClass(Elements.loader, 'loading')
    }
  }
}
