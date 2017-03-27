  async function getAlbums(query) {
  try {

    // Fetching all albums from artist search
    let albums = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=album`);

    // Parsing albums
    let parsedAlbums = await albums.json();

    let albumArr = await parsedAlbums.albums.items;

    for (let album of albumArr) {
      await viewAlbumInfo(album.id);
    }


    // return albumArr;
}
  catch (error) {
      console.log(`Could not get artist information: ${error}`);
  }
}
