let ratingArr = [];
async function getTrackRating(trackIds) {

  try {
    let trackList = await fetch(`https://api.spotify.com/v1/tracks/?ids=${trackIds}`);

    let parsedTrackList = await trackList.json();

    for (let track of parsedTrackList.tracks) {
      await ratingArr.push({name: track.name, rating: track.popularity});
    }

    await ratingArr.sort(function(a,b){
      return b.rating - a.rating;
    });

}

catch (error) {
    console.log(`Could not get track rating information: ${error}`);
}


}
