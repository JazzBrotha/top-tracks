// jshint esversion:6

const View = {
    displaySongs(tracks) {
       Elements.info.innerHTML = '';
       tracks.forEach((track, index) => {
       Elements.info.innerHTML += `
            <div class="column col-2 col-lg-2 col-md-4 col-xs-12">
            <div class="card card-no-border">
              <div class="card-header card-header-less-padding">
                <div class="columns bgc-grey text-center">
                  <div class="column col-2 border-right flex-center">
                  <span class="tc-spotify-green">${track.popularity}</span>
                  </div>
                  <div class="column col-10">
                    <div class="fixed-height no-overflow">
                      <span class="tc-solid-white">${track.name}</span>
                    </div>
                    <div class="fixed-height no-overflow">
                      <span class="tc-light-grey">${track.album.name}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body bgc-black">
              <div class="play-icon-holder text-center">
                <a href="https://embed.spotify.com/?uri=${track.uri}" target="_blank">
                  <span class="play-icon tooltip"><i class="fa fa-2x fa-play-circle-o" aria-hidden="true"></i></span>
                  <div class="overlay"></div>
                </a>
                <img class="img-responsive img-min-height album-cover">
              </div>
              </div>
            </div>
         </div>
     `;

     // Tooltip assignment
     let songLengthStr = track.duration_ms.toString();
     Elements.toolTip[index].setAttribute('data-tooltip', `${songLengthStr[0]}:${songLengthStr[1]}${songLengthStr[2]}`);

     // Check if track has album image
     if (track.album.images.length < 1) {
       Elements.albumCover[index].src = './src/pics/album-cover.png';
     }
     else {
       Elements.albumCover[index].src = `${track.album.images[0].url}`;
     }
   });

     this.removeClass(Elements.loader, 'loading');
 },

clearHtml(element) {
  element.innerHTML = '';
},
displayErrorMessage(artist) {
  Elements.errorMessage.innerHTML = `<h2>Sorry, no songs found for "${artist}"</h2>`;
},
addClass(element, cssClass) {
  element.classList.add(cssClass);
},
removeClass(element, cssClass) {
  element.classList.remove(cssClass);
},

 };
