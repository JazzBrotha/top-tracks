const View = {
    displaySongs(tracks) {
       Elements.info.innerHTML = '';
       tracks.forEach(track => {
       Elements.info.innerHTML += `
            <div class="column col-2">
            <div class="card card-no-border">
              <div class="card-header">
                <div class="columns bgc-grey">
                  <div class="column col-4">
                    <i class="fa fa-2x fa-play-circle-o fa-play-circle-o-white" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <div class="card-body bgc-black">
                <img class="img-responsive" src="${track.album.images[1].url}">
              </div>
              <div class="card-footer">
                <div class="bar">
                  <div class="bar-item bar-item-green" style="width:${track.popularity}%;">${track.popularity}</div>
                </div>
              </div>
            </div>
         </div>
     `;
   });

     this.removeClass(Elements.loader, 'loading');
 },

clearHtml(element) {
  element.innerHTML = '';
},
displayErrorMessage() {
  Elements.errorMessage.innerHTML = `<h2>Sorry, no albums found for "${artist}"</h2>`;
},
addClass(element, cssClass) {
  element.classList.add(cssClass);
},
removeClass(element, cssClass) {
  element.classList.remove(cssClass);
},

 };
