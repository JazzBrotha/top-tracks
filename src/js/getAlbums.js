  async function getAlbums(artist) {
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
}
