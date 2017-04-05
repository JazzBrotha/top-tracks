(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _elements = require('./elements');

var _elements2 = _interopRequireDefault(_elements);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPACE_BAR = 32;

_elements2.default.closeModal.onclick = function () {
    _view2.default.removeClass(_elements2.default.infoModal, 'active');
    _view2.default.removeClass(_elements2.default.searchBox, 'show-xs');
};

_elements2.default.openSpotify.onclick = function () {
    _view2.default.removeClass(_elements2.default.infoModal, 'active');
    _view2.default.removeClass(_elements2.default.searchBox, 'show-xs');
};

// Enable user to search with enter key
_elements2.default.searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    _controller2.default.getTopRatedTracks();
});

//Prevents blank space as first character in input field
_elements2.default.input.addEventListener("keydown", function (e) {
    if (e.which === SPACE_BAR && e.target.selectionStart === 0) {
        e.preventDefault();
    }
});

},{"./controller":2,"./elements":3,"./view":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _elements = require('./elements');

var _elements2 = _interopRequireDefault(_elements);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {

    getTopRatedTracks: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            var artist, albums, trackList, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, album, trackIds, tracks, flatten, ratingArr, finalArr;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:

                            // Display loading symbol to inform user
                            _view2.default.addClass(_elements2.default.loader, 'loading');

                            // Get name of artist from user input
                            artist = _elements2.default.searchField.value;

                            // Get all albums for artist

                            _context.next = 4;
                            return _model2.default.getAlbums(artist);

                        case 4:
                            albums = _context.sent;

                            if (!(albums.length < 1)) {
                                _context.next = 11;
                                break;
                            }

                            _view2.default.clearHtml(_elements2.default.info);
                            _view2.default.displayErrorMessage(artist);
                            _view2.default.removeClass(_elements2.default.loader, 'loading');
                            _context.next = 45;
                            break;

                        case 11:

                            // Clear error message
                            _view2.default.clearHtml(_elements2.default.errorMessage);

                            // Store all artist's tracks
                            trackList = [];

                            // Get each album's tracks

                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 16;
                            _iterator = albums[Symbol.iterator]();

                        case 18:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 30;
                                break;
                            }

                            album = _step.value;
                            _context.next = 22;
                            return _model2.default.getTrackIds(album.id);

                        case 22:
                            trackIds = _context.sent;
                            _context.next = 25;
                            return _model2.default.getTracks(trackIds.join());

                        case 25:
                            tracks = _context.sent;


                            // Look for non exact matches
                            if (album.artists[0].name.toLowerCase() === artist.toLowerCase() || album.artists[0].name.toLowerCase() === 'the ' + artist.toLowerCase()) {

                                // Add to trackList
                                trackList.push(tracks);
                            }

                        case 27:
                            _iteratorNormalCompletion = true;
                            _context.next = 18;
                            break;

                        case 30:
                            _context.next = 36;
                            break;

                        case 32:
                            _context.prev = 32;
                            _context.t0 = _context['catch'](16);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                        case 36:
                            _context.prev = 36;
                            _context.prev = 37;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 39:
                            _context.prev = 39;

                            if (!_didIteratorError) {
                                _context.next = 42;
                                break;
                            }

                            throw _iteratorError;

                        case 42:
                            return _context.finish(39);

                        case 43:
                            return _context.finish(36);

                        case 44:

                            // Inform user if tracklist is empty
                            if (trackList.length < 1) {
                                _view2.default.clearHtml(_elements2.default.info);
                                _view2.default.displayErrorMessage(artist);
                                _view2.default.removeClass(_elements2.default.loader, 'loading');
                            } else {
                                // Reduce to single array
                                flatten = trackList.reduce(function (cur, prev) {
                                    return cur.concat(prev);
                                });

                                // Sort tracks after rating

                                ratingArr = flatten.sort(function (a, b) {
                                    return b.popularity - a.popularity;
                                });

                                // Get top 50 tracks

                                finalArr = ratingArr.filter(function (track, index) {
                                    if (index <= 50) return track;
                                });

                                // Display tracks on page

                                _view2.default.displaySongs(finalArr);
                            }

                        case 45:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[16, 32, 36, 44], [37,, 39, 43]]);
        }));

        function getTopRatedTracks() {
            return _ref.apply(this, arguments);
        }

        return getTopRatedTracks;
    }()
};

},{"./elements":3,"./model":4,"./view":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  albumCover: document.getElementsByClassName('album-cover'),
  closeModal: document.getElementById('close-modal-button'),
  creator: document.getElementById("creator"),
  errorMessage: document.getElementById('error-message'),
  info: document.getElementById('info'),
  infoModal: document.getElementById('info-modal'),
  input: document.querySelector('input'),
  loader: document.getElementById('loader'),
  openSpotify: document.getElementById('open-spotify-button'),
  playIcon: document.getElementsByClassName('play-icon'),
  playLink: document.getElementsByClassName('play-link'),
  searchBox: document.getElementById('search-box'),
  searchField: document.getElementById('artist-search-field'),
  searchForm: document.getElementById('artist-search-form'),
  toolTip: document.getElementsByClassName('tooltip')
};

},{}],4:[function(require,module,exports){
"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Model = {
    getAlbums: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(artist) {
            var albums, parsedAlbums, albumArr;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return fetch("https://api.spotify.com/v1/search?q=artist:" + artist + "&type=album");

                        case 3:
                            albums = _context.sent;
                            _context.next = 6;
                            return albums.json();

                        case 6:
                            parsedAlbums = _context.sent;


                            // Create album array
                            albumArr = parsedAlbums.albums.items;
                            return _context.abrupt("return", albumArr);

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context["catch"](0);

                            console.log("Could not get artist information: " + _context.t0);

                        case 14:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 11]]);
        }));

        function getAlbums(_x) {
            return _ref.apply(this, arguments);
        }

        return getAlbums;
    }(),

    getTrackIds: function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(albumId) {
            var tracks, parsedTracks, trackList, trackIds, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, track;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return fetch("https://api.spotify.com/v1/albums/" + albumId + "/tracks");

                        case 3:
                            tracks = _context2.sent;
                            _context2.next = 6;
                            return tracks.json();

                        case 6:
                            parsedTracks = _context2.sent;


                            // Create tracklist array
                            trackList = parsedTracks.items;
                            trackIds = [];

                            // Get ids from tracklist

                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 12;
                            for (_iterator = trackList[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                track = _step.value;

                                trackIds.push(track.id);
                            }

                            _context2.next = 20;
                            break;

                        case 16:
                            _context2.prev = 16;
                            _context2.t0 = _context2["catch"](12);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 20:
                            _context2.prev = 20;
                            _context2.prev = 21;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 23:
                            _context2.prev = 23;

                            if (!_didIteratorError) {
                                _context2.next = 26;
                                break;
                            }

                            throw _iteratorError;

                        case 26:
                            return _context2.finish(23);

                        case 27:
                            return _context2.finish(20);

                        case 28:
                            return _context2.abrupt("return", trackIds);

                        case 31:
                            _context2.prev = 31;
                            _context2.t1 = _context2["catch"](0);

                            console.log("Could not get album information: " + _context2.t1);

                        case 34:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[0, 31], [12, 16, 20, 28], [21,, 23, 27]]);
        }));

        function getTrackIds(_x2) {
            return _ref2.apply(this, arguments);
        }

        return getTrackIds;
    }(),

    getTracks: function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(trackIds) {
            var trackList, parsedTrackList;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return fetch("https://api.spotify.com/v1/tracks/?ids=" + trackIds);

                        case 3:
                            trackList = _context3.sent;
                            _context3.next = 6;
                            return trackList.json();

                        case 6:
                            parsedTrackList = _context3.sent;
                            return _context3.abrupt("return", parsedTrackList.tracks);

                        case 10:
                            _context3.prev = 10;
                            _context3.t0 = _context3["catch"](0);

                            console.log("Could not get track rating information: " + _context3.t0);

                        case 13:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[0, 10]]);
        }));

        function getTracks(_x3) {
            return _ref3.apply(this, arguments);
        }

        return getTracks;
    }()

};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elements = require('./elements');

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  displaySongs: function displaySongs(tracks) {
    _elements2.default.info.innerHTML = '';
    tracks.forEach(function (track, index) {
      _elements2.default.info.innerHTML += '\n            <div class="column col-xs-12">\n            <div class="card card-no-border">\n              <div class="card-header card-header-less-padding">\n                <div class="columns bgc-grey text-center">\n                  <div class="column col-2 border-right flex-center">\n                  <span class="tc-spotify-green">' + track.popularity + '</span>\n                  </div>\n                  <div class="column col-10">\n                    <div class="fixed-height no-overflow">\n                      <span class="tc-solid-white">' + track.name + '</span>\n                    </div>\n                    <div class="fixed-height no-overflow">\n                      <span class="tc-light-grey">' + track.album.name + '</span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="card-body bgc-black">\n              <div class="play-icon-holder text-center">\n                <a class="play-link">\n                  <span class="play-icon tooltip"></span>\n                  <div class="overlay loading-big loading-green"></div>\n                </a>\n                <img class="img-responsive img-min-height album-cover">\n              </div>\n              </div>\n            </div>\n         </div>\n     ';

      // Tooltip assignment
      var songLengthStr = track.duration_ms.toString();
      _elements2.default.toolTip[index].setAttribute('data-tooltip', songLengthStr[0] + ':' + songLengthStr[1] + songLengthStr[2]);

      // Don't load on mobile
      if (screen.width > 425) {
        _elements2.default.albumCover[index].style.display = 'block';
        // Check if track has album image
        if (track.album.images.length < 1) {
          _elements2.default.albumCover[index].src = './dist/pics/album-cover.png';
        } else {
          _elements2.default.albumCover[index].src = '' + track.album.images[0].url;
        }
      }
    });

    // Embed iframes to be able to play directly from page
    tracks.forEach(function (track, index) {
      _elements2.default.playLink[index].onmouseover = function () {
        if (!this.innerHTML.includes('iframe')) {
          _elements2.default.playIcon[index].innerHTML = '<iframe src="https://embed.spotify.com/?uri=' + track.uri + '" height="80" width="250" frameborder="0" allowtransparency="true"></iframe>';
          // Keep div transformed when playing son
        }
        return;
      };
    });

    this.removeClass(_elements2.default.loader, 'loading');
  },
  clearHtml: function clearHtml(element) {
    element.innerHTML = '';
  },
  displayErrorMessage: function displayErrorMessage(artist) {
    _elements2.default.errorMessage.innerHTML = '<h2>Sorry, no songs found for "' + artist + '"</h2>';
  },
  addClass: function addClass(element, cssClass) {
    element.classList.add(cssClass);
  },
  removeClass: function removeClass(element, cssClass) {
    element.classList.remove(cssClass);
  }
};

},{"./elements":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbnRyb2xsZXIuanMiLCJzcmMvanMvZWxlbWVudHMuanMiLCJzcmMvanMvbW9kZWwuanMiLCJzcmMvanMvdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFRSxJQUFNLFlBQVksRUFBbEI7O0FBRUEsbUJBQVMsVUFBVCxDQUFvQixPQUFwQixHQUE4QixZQUFXO0FBQ3JDLG1CQUFLLFdBQUwsQ0FBaUIsbUJBQVMsU0FBMUIsRUFBcUMsUUFBckM7QUFDQSxtQkFBSyxXQUFMLENBQWlCLG1CQUFTLFNBQTFCLEVBQXFDLFNBQXJDO0FBQ0gsQ0FIRDs7QUFLQSxtQkFBUyxXQUFULENBQXFCLE9BQXJCLEdBQStCLFlBQVc7QUFDdEMsbUJBQUssV0FBTCxDQUFpQixtQkFBUyxTQUExQixFQUFxQyxRQUFyQztBQUNBLG1CQUFLLFdBQUwsQ0FBaUIsbUJBQVMsU0FBMUIsRUFBcUMsU0FBckM7QUFDSCxDQUhEOztBQUtBO0FBQ0EsbUJBQVMsVUFBVCxDQUFvQixnQkFBcEIsQ0FBcUMsUUFBckMsRUFBK0MsVUFBUyxDQUFULEVBQVk7QUFDdkQsTUFBRSxjQUFGO0FBQ0EseUJBQVcsaUJBQVg7QUFDSCxDQUhEOztBQUtBO0FBQ0EsbUJBQVMsS0FBVCxDQUFlLGdCQUFmLENBQWdDLFNBQWhDLEVBQTJDLFVBQVMsQ0FBVCxFQUFZO0FBQ25ELFFBQUksRUFBRSxLQUFGLEtBQVksU0FBWixJQUF5QixFQUFFLE1BQUYsQ0FBUyxjQUFULEtBQTRCLENBQXpELEVBQTREO0FBQ3hELFVBQUUsY0FBRjtBQUNIO0FBQ0osQ0FKRDs7Ozs7Ozs7O0FDdkJGOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7a0JBRWU7O0FBRVg7QUFBQSw2REFBbUI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFZjtB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R0FqRWE7QUFtRWYsV0FuRWUscUJBbUVMLE9BbkVLLEVBbUVJO0FBQ2pCLFlBQVEsU0FBUixHQUFvQixFQUFwQjtBQUNELEdBckVjO0FBc0VmLHFCQXRFZSwrQkFzRUssTUF0RUwsRUFzRWE7QUFDMUIsdUJBQVMsWUFBVCxDQUFzQixTQUF0Qix1Q0FBb0UsTUFBcEU7QUFDRCxHQXhFYztBQXlFZixVQXpFZSxvQkF5RU4sT0F6RU0sRUF5RUcsUUF6RUgsRUF5RWE7QUFDMUIsWUFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLFFBQXRCO0FBQ0QsR0EzRWM7QUE0RWYsYUE1RWUsdUJBNEVILE9BNUVHLEVBNEVNLFFBNUVOLEVBNEVnQjtBQUM3QixZQUFRLFNBQVIsQ0FBa0IsTUFBbEIsQ0FBeUIsUUFBekI7QUFDRDtBQTlFYyxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBFbGVtZW50cyBmcm9tICcuL2VsZW1lbnRzJ1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3J1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJ1xuXG4gIGNvbnN0IFNQQUNFX0JBUiA9IDMyO1xuXG4gIEVsZW1lbnRzLmNsb3NlTW9kYWwub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgVmlldy5yZW1vdmVDbGFzcyhFbGVtZW50cy5pbmZvTW9kYWwsICdhY3RpdmUnKTtcbiAgICAgIFZpZXcucmVtb3ZlQ2xhc3MoRWxlbWVudHMuc2VhcmNoQm94LCAnc2hvdy14cycpO1xuICB9O1xuXG4gIEVsZW1lbnRzLm9wZW5TcG90aWZ5Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIFZpZXcucmVtb3ZlQ2xhc3MoRWxlbWVudHMuaW5mb01vZGFsLCAnYWN0aXZlJyk7XG4gICAgICBWaWV3LnJlbW92ZUNsYXNzKEVsZW1lbnRzLnNlYXJjaEJveCwgJ3Nob3cteHMnKTtcbiAgfTtcblxuICAvLyBFbmFibGUgdXNlciB0byBzZWFyY2ggd2l0aCBlbnRlciBrZXlcbiAgRWxlbWVudHMuc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBDb250cm9sbGVyLmdldFRvcFJhdGVkVHJhY2tzKCk7XG4gIH0pO1xuXG4gIC8vUHJldmVudHMgYmxhbmsgc3BhY2UgYXMgZmlyc3QgY2hhcmFjdGVyIGluIGlucHV0IGZpZWxkXG4gIEVsZW1lbnRzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLndoaWNoID09PSBTUEFDRV9CQVIgJiYgZS50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPT09IDApIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gIH0pO1xuIiwiaW1wb3J0IEVsZW1lbnRzIGZyb20gJy4vZWxlbWVudHMnXG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCdcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgZ2V0VG9wUmF0ZWRUcmFja3M6IGFzeW5jIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8vIERpc3BsYXkgbG9hZGluZyBzeW1ib2wgdG8gaW5mb3JtIHVzZXJcbiAgICAgICAgVmlldy5hZGRDbGFzcyhFbGVtZW50cy5sb2FkZXIsICdsb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gR2V0IG5hbWUgb2YgYXJ0aXN0IGZyb20gdXNlciBpbnB1dFxuICAgICAgICBsZXQgYXJ0aXN0ID0gRWxlbWVudHMuc2VhcmNoRmllbGQudmFsdWU7XG5cbiAgICAgICAgLy8gR2V0IGFsbCBhbGJ1bXMgZm9yIGFydGlzdFxuICAgICAgICBsZXQgYWxidW1zID0gYXdhaXQgTW9kZWwuZ2V0QWxidW1zKGFydGlzdCk7XG5cbiAgICAgICAgLy8gSW5mb3JtIHVzZXIgaWYgbm8gYWxidW1zIHdlcmUgZm91bmQgZm9yIGFydGlzdFxuICAgICAgICBpZiAoYWxidW1zLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIFZpZXcuY2xlYXJIdG1sKEVsZW1lbnRzLmluZm8pO1xuICAgICAgICAgICAgVmlldy5kaXNwbGF5RXJyb3JNZXNzYWdlKGFydGlzdCk7XG4gICAgICAgICAgICBWaWV3LnJlbW92ZUNsYXNzKEVsZW1lbnRzLmxvYWRlciwgJ2xvYWRpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByb2NlZWQgaWYgYWxidW1zIHdlcmUgZm91bmRcbiAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIC8vIENsZWFyIGVycm9yIG1lc3NhZ2VcbiAgICAgICAgICAgIFZpZXcuY2xlYXJIdG1sKEVsZW1lbnRzLmVycm9yTWVzc2FnZSk7XG5cbiAgICAgICAgICAgIC8vIFN0b3JlIGFsbCBhcnRpc3QncyB0cmFja3NcbiAgICAgICAgICAgIGxldCB0cmFja0xpc3QgPSBbXTtcblxuICAgICAgICAgICAgLy8gR2V0IGVhY2ggYWxidW0ncyB0cmFja3NcbiAgICAgICAgICAgIGZvciAobGV0IGFsYnVtIG9mIGFsYnVtcykge1xuXG4gICAgICAgICAgICAgICAgLy8gR2V0IHRyYWNrIGlkc1xuICAgICAgICAgICAgICAgIGxldCB0cmFja0lkcyA9IGF3YWl0IE1vZGVsLmdldFRyYWNrSWRzKGFsYnVtLmlkKTtcblxuICAgICAgICAgICAgICAgIC8vIEdldCB0cmFja3NcbiAgICAgICAgICAgICAgICBsZXQgdHJhY2tzID0gYXdhaXQgTW9kZWwuZ2V0VHJhY2tzKHRyYWNrSWRzLmpvaW4oKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBMb29rIGZvciBub24gZXhhY3QgbWF0Y2hlc1xuICAgICAgICAgICAgICAgIGlmIChhbGJ1bS5hcnRpc3RzWzBdLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gYXJ0aXN0LnRvTG93ZXJDYXNlKCkgfHwgYWxidW0uYXJ0aXN0c1swXS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IGB0aGUgJHthcnRpc3QudG9Mb3dlckNhc2UoKX1gKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRvIHRyYWNrTGlzdFxuICAgICAgICAgICAgICAgICAgICB0cmFja0xpc3QucHVzaCh0cmFja3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSW5mb3JtIHVzZXIgaWYgdHJhY2tsaXN0IGlzIGVtcHR5XG4gICAgICAgICAgICBpZiAodHJhY2tMaXN0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICBWaWV3LmNsZWFySHRtbChFbGVtZW50cy5pbmZvKTtcbiAgICAgICAgICAgICAgICBWaWV3LmRpc3BsYXlFcnJvck1lc3NhZ2UoYXJ0aXN0KTtcbiAgICAgICAgICAgICAgICBWaWV3LnJlbW92ZUNsYXNzKEVsZW1lbnRzLmxvYWRlciwgJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJlZHVjZSB0byBzaW5nbGUgYXJyYXlcbiAgICAgICAgICAgICAgICBsZXQgZmxhdHRlbiA9IHRyYWNrTGlzdC5yZWR1Y2UoKGN1ciwgcHJldikgPT4gY3VyLmNvbmNhdChwcmV2KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBTb3J0IHRyYWNrcyBhZnRlciByYXRpbmdcbiAgICAgICAgICAgICAgICBsZXQgcmF0aW5nQXJyID0gZmxhdHRlbi5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGIucG9wdWxhcml0eSAtIGEucG9wdWxhcml0eTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIEdldCB0b3AgNTAgdHJhY2tzXG4gICAgICAgICAgICAgICAgbGV0IGZpbmFsQXJyID0gcmF0aW5nQXJyLmZpbHRlcigodHJhY2ssIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA8PSA1MClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFjaztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgdHJhY2tzIG9uIHBhZ2VcbiAgICAgICAgICAgICAgICBWaWV3LmRpc3BsYXlTb25ncyhmaW5hbEFycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBhbGJ1bUNvdmVyOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhbGJ1bS1jb3ZlcicpLFxuICBjbG9zZU1vZGFsIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLW1vZGFsLWJ1dHRvbicpLFxuICBjcmVhdG9yIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdG9yXCIpLFxuICBlcnJvck1lc3NhZ2UgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3ItbWVzc2FnZScpLFxuICBpbmZvIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm8nKSxcbiAgaW5mb01vZGFsIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm8tbW9kYWwnKSxcbiAgaW5wdXQgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLFxuICBsb2FkZXIgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGVyJyksXG4gIG9wZW5TcG90aWZ5IDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tc3BvdGlmeS1idXR0b24nKSxcbiAgcGxheUljb24gOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwbGF5LWljb24nKSxcbiAgcGxheUxpbmsgOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwbGF5LWxpbmsnKSxcbiAgc2VhcmNoQm94IDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1ib3gnKSxcbiAgc2VhcmNoRmllbGQgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJ0aXN0LXNlYXJjaC1maWVsZCcpLFxuICBzZWFyY2hGb3JtIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FydGlzdC1zZWFyY2gtZm9ybScpLFxuICB0b29sVGlwIDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9vbHRpcCcpLFxufTtcbiIsImNvbnN0IE1vZGVsID0ge1xuICAgIGdldEFsYnVtczogYXN5bmMgZnVuY3Rpb24oYXJ0aXN0KSB7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEZldGNoaW5nIGFsbCBhbGJ1bXMgZnJvbSBhcnRpc3RcbiAgICAgICAgICAgIGxldCBhbGJ1bXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuc3BvdGlmeS5jb20vdjEvc2VhcmNoP3E9YXJ0aXN0OiR7YXJ0aXN0fSZ0eXBlPWFsYnVtYCk7XG5cbiAgICAgICAgICAgIC8vIFBhcnNlIGFsYnVtIG9iamVjdFxuICAgICAgICAgICAgbGV0IHBhcnNlZEFsYnVtcyA9IGF3YWl0IGFsYnVtcy5qc29uKCk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbGJ1bSBhcnJheVxuICAgICAgICAgICAgbGV0IGFsYnVtQXJyID0gcGFyc2VkQWxidW1zLmFsYnVtcy5pdGVtcztcblxuICAgICAgICAgICAgcmV0dXJuIGFsYnVtQXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQ291bGQgbm90IGdldCBhcnRpc3QgaW5mb3JtYXRpb246ICR7ZXJyb3J9YCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0VHJhY2tJZHM6IGFzeW5jIGZ1bmN0aW9uKGFsYnVtSWQpIHtcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAvLyBGZXRjaCB0cmFjayBvYmplY3QgZnJvbSBhbGJ1bVxuICAgICAgICAgICAgbGV0IHRyYWNrcyA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5zcG90aWZ5LmNvbS92MS9hbGJ1bXMvJHthbGJ1bUlkfS90cmFja3NgKTtcblxuICAgICAgICAgICAgLy8gUGFyc2UgdHJhY2sgb2JqZWN0XG4gICAgICAgICAgICBsZXQgcGFyc2VkVHJhY2tzID0gYXdhaXQgdHJhY2tzLmpzb24oKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRyYWNrbGlzdCBhcnJheVxuICAgICAgICAgICAgbGV0IHRyYWNrTGlzdCA9IHBhcnNlZFRyYWNrcy5pdGVtcztcblxuICAgICAgICAgICAgbGV0IHRyYWNrSWRzID0gW107XG5cbiAgICAgICAgICAgIC8vIEdldCBpZHMgZnJvbSB0cmFja2xpc3RcbiAgICAgICAgICAgIGZvciAobGV0IHRyYWNrIG9mIHRyYWNrTGlzdCkge1xuICAgICAgICAgICAgICAgIHRyYWNrSWRzLnB1c2godHJhY2suaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJhY2tJZHM7XG4gICAgICAgIH1cblxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDb3VsZCBub3QgZ2V0IGFsYnVtIGluZm9ybWF0aW9uOiAke2Vycm9yfWApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldFRyYWNrczogYXN5bmMgZnVuY3Rpb24odHJhY2tJZHMpIHtcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAvLyBGZXRjaCB0cmFjayBvYmplY3RzXG4gICAgICAgICAgICBsZXQgdHJhY2tMaXN0ID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLnNwb3RpZnkuY29tL3YxL3RyYWNrcy8/aWRzPSR7dHJhY2tJZHN9YCk7XG5cbiAgICAgICAgICAgIC8vIFBhcnNlIHRyYWNrIG9iamVjdHNcbiAgICAgICAgICAgIGxldCBwYXJzZWRUcmFja0xpc3QgPSBhd2FpdCB0cmFja0xpc3QuanNvbigpO1xuXG4gICAgICAgICAgICAvLyBSZXR1cm4gdHJhY2tzXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VkVHJhY2tMaXN0LnRyYWNrcztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYENvdWxkIG5vdCBnZXQgdHJhY2sgcmF0aW5nIGluZm9ybWF0aW9uOiAke2Vycm9yfWApO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgRWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cydcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGRpc3BsYXlTb25ncyh0cmFja3MpIHtcbiAgICAgICBFbGVtZW50cy5pbmZvLmlubmVySFRNTCA9ICcnO1xuICAgICAgIHRyYWNrcy5mb3JFYWNoKCh0cmFjaywgaW5kZXgpID0+IHtcbiAgICAgICBFbGVtZW50cy5pbmZvLmlubmVySFRNTCArPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGNvbC14cy0xMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1uby1ib3JkZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyIGNhcmQtaGVhZGVyLWxlc3MtcGFkZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zIGJnYy1ncmV5IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGNvbC0yIGJvcmRlci1yaWdodCBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0Yy1zcG90aWZ5LWdyZWVuXCI+JHt0cmFjay5wb3B1bGFyaXR5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBjb2wtMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpeGVkLWhlaWdodCBuby1vdmVyZmxvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGMtc29saWQtd2hpdGVcIj4ke3RyYWNrLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpeGVkLWhlaWdodCBuby1vdmVyZmxvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGMtbGlnaHQtZ3JleVwiPiR7dHJhY2suYWxidW0ubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5IGJnYy1ibGFja1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxheS1pY29uLWhvbGRlciB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwicGxheS1saW5rXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBsYXktaWNvbiB0b29sdGlwXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJsYXkgbG9hZGluZy1iaWcgbG9hZGluZy1ncmVlblwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiaW1nLXJlc3BvbnNpdmUgaW1nLW1pbi1oZWlnaHQgYWxidW0tY292ZXJcIj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICA8L2Rpdj5cbiAgICAgYDtcblxuICAgIC8vIFRvb2x0aXAgYXNzaWdubWVudFxuICAgICBsZXQgc29uZ0xlbmd0aFN0ciA9IHRyYWNrLmR1cmF0aW9uX21zLnRvU3RyaW5nKCk7XG4gICAgIEVsZW1lbnRzLnRvb2xUaXBbaW5kZXhdLnNldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwJywgYCR7c29uZ0xlbmd0aFN0clswXX06JHtzb25nTGVuZ3RoU3RyWzFdfSR7c29uZ0xlbmd0aFN0clsyXX1gKTtcblxuICAgICAvLyBEb24ndCBsb2FkIG9uIG1vYmlsZVxuICAgICBpZiAoc2NyZWVuLndpZHRoID4gNDI1KSB7XG4gICAgICAgRWxlbWVudHMuYWxidW1Db3ZlcltpbmRleF0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgIC8vIENoZWNrIGlmIHRyYWNrIGhhcyBhbGJ1bSBpbWFnZVxuICAgICBpZiAodHJhY2suYWxidW0uaW1hZ2VzLmxlbmd0aCA8IDEpIHtcbiAgICAgICBFbGVtZW50cy5hbGJ1bUNvdmVyW2luZGV4XS5zcmMgPSAnLi9kaXN0L3BpY3MvYWxidW0tY292ZXIucG5nJztcbiAgICAgfVxuICAgICBlbHNlIHtcbiAgICAgICBFbGVtZW50cy5hbGJ1bUNvdmVyW2luZGV4XS5zcmMgPSBgJHt0cmFjay5hbGJ1bS5pbWFnZXNbMF0udXJsfWA7XG4gICAgIH1cbiAgICAgfVxuXG4gICB9KTtcblxuICAgLy8gRW1iZWQgaWZyYW1lcyB0byBiZSBhYmxlIHRvIHBsYXkgZGlyZWN0bHkgZnJvbSBwYWdlXG4gICB0cmFja3MuZm9yRWFjaCgodHJhY2ssIGluZGV4KSA9PiB7XG4gICAgIEVsZW1lbnRzLnBsYXlMaW5rW2luZGV4XS5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgIGlmICghdGhpcy5pbm5lckhUTUwuaW5jbHVkZXMoJ2lmcmFtZScpKSB7XG4gICAgICAgIEVsZW1lbnRzLnBsYXlJY29uW2luZGV4XS5pbm5lckhUTUwgPSBgPGlmcmFtZSBzcmM9XCJodHRwczovL2VtYmVkLnNwb3RpZnkuY29tLz91cmk9JHt0cmFjay51cml9XCIgaGVpZ2h0PVwiODBcIiB3aWR0aD1cIjI1MFwiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93dHJhbnNwYXJlbmN5PVwidHJ1ZVwiPjwvaWZyYW1lPmA7XG4gICAgICAgIC8vIEtlZXAgZGl2IHRyYW5zZm9ybWVkIHdoZW4gcGxheWluZyBzb25cbiAgICAgICB9XG4gICAgICAgcmV0dXJuO1xuICAgICB9O1xuICAgfSk7XG5cbiAgICAgdGhpcy5yZW1vdmVDbGFzcyhFbGVtZW50cy5sb2FkZXIsICdsb2FkaW5nJyk7XG4gfSxcblxuY2xlYXJIdG1sKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5pbm5lckhUTUwgPSAnJztcbn0sXG5kaXNwbGF5RXJyb3JNZXNzYWdlKGFydGlzdCkge1xuICBFbGVtZW50cy5lcnJvck1lc3NhZ2UuaW5uZXJIVE1MID0gYDxoMj5Tb3JyeSwgbm8gc29uZ3MgZm91bmQgZm9yIFwiJHthcnRpc3R9XCI8L2gyPmA7XG59LFxuYWRkQ2xhc3MoZWxlbWVudCwgY3NzQ2xhc3MpIHtcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbn0sXG5yZW1vdmVDbGFzcyhlbGVtZW50LCBjc3NDbGFzcykge1xuICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzQ2xhc3MpO1xufSxcblxuIH07XG4iXX0=
