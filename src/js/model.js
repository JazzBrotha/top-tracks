export default {
  getAccess: async function () {
    try {
      const response = await fetch('/access-spotify')
      if (response) {
        const responseText = await response.text()
        return responseText
      } else {
        return 'Could not get access token'
      }
    } catch (err) {
      console.log('Could not get access token')
    }
  },
  getAlbums: async function (artist, token) {
    try {
      const response = await fetch(`/get-albums`, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          artist: artist,
          token: token
        })
      })
      if (response) {
        const parsedAlbums = await response.json()

        // Create album array
        const albumArr = parsedAlbums.albums.items

        return albumArr
      } else {
        return 'error'
      }
    } catch (error) {
      console.log(`Could not get artist information: ${error}`)
      return 'error'
    }
  },

  getTrackIds: async function (albumId, token) {
    try {
      // Fetch track object from album
      const response = await fetch(`/get-trackids`, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          albumId: albumId,
          token: token
        })
      })

      if (response) {
        // Parse track object
        const parsedTracks = await response.json()

        // Create tracklist array
        const trackList = parsedTracks.items

        let trackIds = []

      // Get ids from tracklist
        for (const track of trackList) {
          trackIds.push(track.id)
        }

        return trackIds
      }
    } catch (error) {
      console.log(`Could not get album information: ${error}`)
      return 'error'
    }
  },

  getTracks: async function (trackIds, token) {
    try {
      // Fetch track objects
      const response = await fetch(`/get-tracks`, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          trackIds: trackIds,
          token: token
        })
      })

      if (response) {
        // Parse track objects
        const parsedTrackList = await response.json()

        // Return tracks
        return parsedTrackList.tracks
      }
    } catch (error) {
      console.log(`Could not get track rating information: ${error}`)
      return 'error'
    }
  }
}
