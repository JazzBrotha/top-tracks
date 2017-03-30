  // jshint esversion:6

  const ENTER_KEY = 13;
  const SPACE_BAR = 32;

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

  //Prevents blank space as first character in input field
   Elements.input.addEventListener("keydown", function(event) {
       if (event.which === SPACE_BAR && event.target.selectionStart === 0) {
           event.preventDefault();
         }
       });

  // Bind search button
  Elements.searchButton.onclick = Controller.getTopRatedTracks;
