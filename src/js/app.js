  // jshint esversion:6

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
  Elements.searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    Controller.getTopRatedTracks();
  });

  //Prevents blank space as first character in input field
   Elements.input.addEventListener("keydown", function(e) {
       if (e.which === SPACE_BAR && e.target.selectionStart === 0) {
           e.preventDefault();
         }
       });
