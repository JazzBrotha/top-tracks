  // jshint esversion:6

  const ENTER_KEY = 13;

  Elements.closeModal.onclick = function() {
    View.removeClass(Elements.infoModal, 'active');
    View.removeClass(Elements.searchBox, 'hide');
  };

  Elements.openSpotify.onclick = function() {
    View.removeClass(Elements.infoModal, 'active');
    View.removeClass(Elements.searchBox, 'hide');
  };

  // Enable user to search with enter key
  Elements.searchField.addEventListener('keyup', function(e) {
    if (e.which === ENTER_KEY) {
      Controller.getTopRatedTracks();
    }
  });

  // Bind search button
  Elements.searchButton.onclick = Controller.getTopRatedTracks;
