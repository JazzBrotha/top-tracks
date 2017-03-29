
async function getTrackRating(trackIds) {

  try {
    let trackList = await fetch(`https://api.spotify.com/v1/tracks/?ids=${trackIds}`);

    let parsedTrackList = await trackList.json();

    return parsedTrackList.tracks;
}

catch (error) {
    console.log(`Could not get track rating information: ${error}`);
}


}
