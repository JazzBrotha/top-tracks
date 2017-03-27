// jshint esversion:6

const creator = document.getElementById("creator");

const searchButton = document.getElementById('artist-search-button');

const searchField = document.getElementById('artist-search');

searchButton.onclick = function() {
  let artist = searchField.value;
  getAlbums(artist);
};
