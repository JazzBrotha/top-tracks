import 'babel-polyfill'
import '../scss/spectre.scss'
import '../scss/spectre-icons.scss'
import '../scss/main.scss'
import Elements from './elements'
import View from './view'
import Controller from './controller'

const SPACE_BAR = 32

Elements.closeModal.onclick = function () {
  View.removeClass(Elements.infoModal, 'active')
  View.removeClass(Elements.searchBox, 'show-xs')
}

Elements.openSpotify.onclick = function () {
  View.removeClass(Elements.infoModal, 'active')
  View.removeClass(Elements.searchBox, 'show-xs')
}

  // Enable user to search with enter key
Elements.searchForm.addEventListener('submit', function (e) {
  e.preventDefault()
  Controller.getTopRatedTracks()
})

  // Prevents blank space as first character in input field
Elements.input.addEventListener('keydown', function (e) {
  if (e.which === SPACE_BAR && e.target.selectionStart === 0) {
      e.preventDefault()
    }
})
