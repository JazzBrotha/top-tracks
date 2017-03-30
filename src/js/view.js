// jshint esversion:6

const View = {
    displaySongs(tracks) {
       Elements.info.innerHTML = '';
       tracks.forEach((track, index) => {
       Elements.info.innerHTML += `
            <div class="column col-xs-12 col-md-4 col-2">
            <div class="card card-no-border">
              <div class="card-header card-header-less-padding">
                <div class="columns bgc-grey">
                  <div class="column col-2 border-right flex-center">
                  <span class="tc-light-grey">${track.popularity}</span>
                  </div>
                  <div class="column col-10">
                  <span class="tc-solid-white">${track.name}</span>
                  </div>
                </div>
              </div>
              <div class="card-body bgc-black">
              <div class="thumb flex-center">
                <a href="https://embed.spotify.com/?uri=${track.uri}" target="_blank">
                  <span class="play"><i class="fa fa-2x fa-play-circle-o fa-play-circle-o-white" aria-hidden="true"></i></span>
                  <div class="overlay"></div>
                </a>
                <img class="img-responsive album-cover">
              </div>
              </div>
            </div>
         </div>
     `;

     // Check if track has album image
     if (track.album.images.length < 1) {
       Elements.albumCover[index].src = './src/pics/album-cover.png';
     }
     else {
       Elements.albumCover[index].src = `${track.album.images[1].url}`;
     }
   });

     this.removeClass(Elements.loader, 'loading');
 },

clearHtml(element) {
  element.innerHTML = '';
},
displayErrorMessage(artist) {
  Elements.errorMessage.innerHTML = `<h2>Sorry, no albums found for "${artist}"</h2>`;
},
addClass(element, cssClass) {
  element.classList.add(cssClass);
},
removeClass(element, cssClass) {
  element.classList.remove(cssClass);
},

 };
