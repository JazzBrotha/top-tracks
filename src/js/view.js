import Elements from './elements'

export default {
    displaySongs(tracks) {
       Elements.info.innerHTML = '';
       tracks.forEach((track, index) => {
       Elements.info.innerHTML += `
            <div class="column col-xs-12 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <div class="card card-no-border">
              <div class="card-header card-header-less-padding">
                <div class="columns bgc-grey text-center">
                  <div class="column col-2 border-right flex-center">
                  <span class="tc-spotify-green">${track.popularity}</span>
                  </div>
                  <div class="column col-10">
                    <div class="fixed-height no-overflow">
                      <span class="tc-solid-white album-info-text">${track.name}</span>
                    </div>
                    <div class="fixed-height no-overflow">
                      <span class="tc-light-grey album-info-text">${track.album.name}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body bgc-black">
              <div class="play-icon-holder text-center">
                <a class="play-link">
                  <span class="play-icon tooltip"></span>
                  <div class="overlay loading-big loading-green"></div>
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

     // Don't load on mobile
     if (screen.width > 425) {
       Elements.albumCover[index].style.display = 'block';
     // Check if track has album image
     if (track.album.images.length < 1) {
       Elements.albumCover[index].src = './dist/pics/album-cover.png';
     }
     else {
       Elements.albumCover[index].src = `${track.album.images[0].url}`;
     }
     }

   });

   // Embed iframes to be able to play directly from page
   tracks.forEach((track, index) => {
     Elements.playLink[index].onmouseover = function() {
       if (!this.innerHTML.includes('iframe')) {
        Elements.playIcon[index].innerHTML = `<iframe src="https://embed.spotify.com/?uri=${track.uri}" height="80" width="250" frameborder="0" allowtransparency="true"></iframe>`;
        // Keep div transformed when playing son
       }
       return;
     };
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
