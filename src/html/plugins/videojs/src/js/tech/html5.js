/**
 * @fileoverview HTML5 Media Controller - Wrapper for HTML5 Media API
 */

import Tech from './tech.js';
import Component from '../component';
import * as Dom from '../utils/dom.js';
import * as Url from '../utils/url.js';
import * as Fn from '../utils/fn.js';
import log from '../utils/log.js';
import * as browser from '../utils/browser.js';
import document from 'global/document';
import window from 'global/window';
import assign from 'object.assign';
import mergeOptions from '../utils/merge-options.js';

/**
 * HTML5 Media Controller - Wrapper for HTML5 Media API
 * @param {Player|Object} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */
class Html5 extends Tech {

  constructor(options, ready){
    super(options, ready);

    const source = options.source;

    // Set the source if one is provided
    // 1) Check if the source is new (if not, we want to keep the original so playback isn't interrupted)
    // 2) Check to see if the network state of the tag was failed at init, and if so, reset the source
    // anyway so the error gets fired.
    if (source && (this.el_.currentSrc !== source.src || (options.tag && options.tag.initNetworkState_ === 3))) {
      this.setSource(source);
    }

    if (this.el_.hasChildNodes()) {

      let nodes = this.el_.childNodes;
      let nodesLength = nodes.length;
      let removeNodes = [];

      while (nodesLength--) {
        let node = nodes[nodesLength];
        let nodeName = node.nodeName.toLowerCase();
        if (nodeName === 'track') {
          if (!this.featuresNativeTextTracks) {
            // Empty video tag tracks so the built-in player doesn't use them also.
            // This may not be fast enough to stop HTML5 browsers from reading the tags
            // so we'll need to turn off any default tracks if we're manually doing
            // captions and subtitles. videoElement.textTracks
            removeNodes.push(node);
          } else {
            this.remoteTextTracks().addTrack_(node.track);
          }
        }
      }

      for (let i=0; i<removeNodes.length; i++) {
        this.el_.removeChild(removeNodes[i]);
      }
    }

    if (this.featuresNativeTextTracks) {
      this.on('loadstart', Fn.bind(this, this.hideCaptions));
    }

    // Determine if native controls should be used
    // Our goal should be to get the custom controls on mobile solid everywhere
    // so we can remove this all together. Right now this will block custom
    // controls on touch enabled laptops like the Chrome Pixel
    if (browser.TOUCH_ENABLED && options.nativeControlsForTouch === true) {
      this.trigger('usenativecontrols');
    }

    this.triggerReady();
  }


  dispose() {
    Html5.disposeMediaElement(this.el_);
    super.dispose();
  }

  createEl() {
    let el = this.options_.tag;

    // Check if this browser supports moving the element into the box.
    // On the iPhone video will break if you move the element,
    // So we have to create a brand new element.
    if (!el || this['movingMediaElementInDOM'] === false) {

      // If the original tag is still there, clone and remove it.
      if (el) {
        const clone = el.cloneNode(false);
        Html5.disposeMediaElement(el);
        el = clone;
      } else {
        el = document.createElement('video');

        // determine if native controls should be used
        let tagAttributes = this.options_.tag && Dom.getElAttributes(this.options_.tag);
        let attributes = mergeOptions({}, tagAttributes);
        if (!browser.TOUCH_ENABLED || this.options_.nativeControlsForTouch !== true) {
          delete attributes.controls;
        }

        Dom.setElAttributes(el,
          assign(attributes, {
            id: this.options_.techId,
            class: 'vjs-tech'
          })
        );
      }

      if (this.options_.tracks) {
        for (let i = 0; i < this.options_.tracks.length; i++) {
          const track = this.options_.tracks[i];
          let trackEl = document.createElement('track');
          trackEl.kind = track.kind;
          trackEl.label = track.label;
          trackEl.srclang = track.srclang;
          trackEl.src = track.src;
          if ('default' in track) {
            trackEl.setAttribute('default', 'default');
          }
          el.appendChild(trackEl);
        }
      }
    }

    // Update specific tag settings, in case they were overridden
    let settingsAttrs = ['autoplay','preload','loop','muted'];
    for (let i = settingsAttrs.length - 1; i >= 0; i--) {
      const attr = settingsAttrs[i];
      let overwriteAttrs = {};
      if (typeof this.options_[attr] !== 'undefined') {
        overwriteAttrs[attr] = this.options_[attr];
      }
      Dom.setElAttributes(el, overwriteAttrs);
    }

    return el;
    // jenniisawesome = true;
  }


  hideCaptions() {
    let tracks = this.el_.querySelectorAll('track');
    let i = tracks.length;
    const kinds = {
      'captions': 1,
      'subtitles': 1
    };

    while (i--) {
      let track = tracks[i].track;
      if ((track && track['kind'] in kinds) &&
          (!tracks[i]['default'])) {
        track.mode = 'disabled';
      }
    }
  }

  play() { this.el_.play(); }
  pause() { this.el_.pause(); }
  paused() { return this.el_.paused; }

  currentTime() { return this.el_.currentTime; }
  setCurrentTime(seconds) {
    try {
      this.el_.currentTime = seconds;
    } catch(e) {
      log(e, 'Video is not ready. (Video.js)');
      // this.warning(VideoJS.warnings.videoNotReady);
    }
  }

  duration() { return this.el_.duration || 0; }

  buffered() { return this.el_.buffered; }

  volume() { return this.el_.volume; }
  setVolume(percentAsDecimal) { this.el_.volume = percentAsDecimal; }

  muted() { return this.el_.muted; }
  setMuted(muted) { this.el_.muted = muted; }

  width() { return this.el_.offsetWidth; }
  height() {  return this.el_.offsetHeight; }

  supportsFullScreen() {
    if (typeof this.el_.webkitEnterFullScreen === 'function') {
      let userAgent = window.navigator.userAgent;
      // Seems to be broken in Chromium/Chrome && Safari in Leopard
      if (/Android/.test(userAgent) || !/Chrome|Mac OS X 10.5/.test(userAgent)) {
        return true;
      }
    }
    return false;
  }

  enterFullScreen() {
    var video = this.el_;

    if ('webkitDisplayingFullscreen' in video) {
      this.one('webkitbeginfullscreen', function() {
        this.one('webkitendfullscreen', function() {
          this.trigger('fullscreenchange');
        });

        this.trigger('fullscreenchange');
      });
    }

    if (video.paused && video.networkState <= video.HAVE_METADATA) {
      // attempt to prime the video element for programmatic access
      // this isn't necessary on the desktop but shouldn't hurt
      this.el_.play();

      // playing and pausing synchronously during the transition to fullscreen
      // can get iOS ~6.1 devices into a play/pause loop
      this.setTimeout(function(){
        video.pause();
        video.webkitEnterFullScreen();
      }, 0);
    } else {
      video.webkitEnterFullScreen();
    }
  }

  exitFullScreen() {
    this.el_.webkitExitFullScreen();
  }

  src(src) {
    if (src === undefined) {
      return this.el_.src;
    } else {
      // Setting src through `src` instead of `setSrc` will be deprecated
      this.setSrc(src);
    }
  }

  setSrc(src) { this.el_.src = src; }

  load(){ this.el_.load(); }

  currentSrc() { return this.el_.currentSrc; }

  poster() { return this.el_.poster; }
  setPoster(val) { this.el_.poster = val; }

  preload() { return this.el_.preload; }
  setPreload(val) { this.el_.preload = val; }

  autoplay() { return this.el_.autoplay; }
  setAutoplay(val) { this.el_.autoplay = val; }

  controls() { return this.el_.controls; }
  setControls(val) { this.el_.controls = !!val; }

  loop() { return this.el_.loop; }
  setLoop(val) { this.el_.loop = val; }

  error() { return this.el_.error; }
  seeking() { return this.el_.seeking; }
  ended() { return this.el_.ended; }
  defaultMuted() { return this.el_.defaultMuted; }

  playbackRate() { return this.el_.playbackRate; }
  setPlaybackRate(val) { this.el_.playbackRate = val; }

  networkState() { return this.el_.networkState; }
  readyState() { return this.el_.readyState; }

  videoWidth() { return this.el_.videoWidth; }
  videoHeight() { return this.el_.videoHeight; }

  textTracks() {
    if (!this['featuresNativeTextTracks']) {
      return super.textTracks();
    }

    return this.el_.textTracks;
  }
  addTextTrack(kind, label, language) {
    if (!this['featuresNativeTextTracks']) {
      return super.addTextTrack(kind, label, language);
    }

    return this.el_.addTextTrack(kind, label, language);
  }

  addRemoteTextTrack(options={}) {
    if (!this['featuresNativeTextTracks']) {
      return super.addRemoteTextTrack(options);
    }

    var track = document.createElement('track');

    if (options['kind']) {
      track['kind'] = options['kind'];
    }
    if (options['label']) {
      track['label'] = options['label'];
    }
    if (options['language'] || options['srclang']) {
      track['srclang'] = options['language'] || options['srclang'];
    }
    if (options['default']) {
      track['default'] = options['default'];
    }
    if (options['id']) {
      track['id'] = options['id'];
    }
    if (options['src']) {
      track['src'] = options['src'];
    }

    this.el().appendChild(track);

    if (track.track['kind'] === 'metadata') {
      track['track']['mode'] = 'hidden';
    } else {
      track['track']['mode'] = 'disabled';
    }

    track['onload'] = function() {
      var tt = track['track'];
      if (track.readyState >= 2) {
        if (tt['kind'] === 'metadata' && tt['mode'] !== 'hidden') {
          tt['mode'] = 'hidden';
        } else if (tt['kind'] !== 'metadata' && tt['mode'] !== 'disabled') {
          tt['mode'] = 'disabled';
        }
        track['onload'] = null;
      }
    };

    this.remoteTextTracks().addTrack_(track.track);

    return track;
  }

  removeRemoteTextTrack(track) {
    if (!this['featuresNativeTextTracks']) {
      return super.removeRemoteTextTrack(track);
    }

    var tracks, i;

    this.remoteTextTracks().removeTrack_(track);

    tracks = this.el()['querySelectorAll']('track');

    for (i = 0; i < tracks.length; i++) {
      if (tracks[i] === track || tracks[i]['track'] === track) {
        tracks[i]['parentNode']['removeChild'](tracks[i]);
        break;
      }
    }
  }

}


/* HTML5 Support Testing ---------------------------------------------------- */

/**
 * Element for testing browser HTML5 video capabilities
 * @type {Element}
 * @constant
 * @private
 */
Html5.TEST_VID = document.createElement('video');
let track = document.createElement('track');
track.kind = 'captions';
track.srclang = 'en';
track.label = 'English';
Html5.TEST_VID.appendChild(track);

/**
 * Check if HTML5 video is supported by this browser/device
 * @return {Boolean}
 */
Html5.isSupported = function(){
  // IE9 with no Media Player is a LIAR! (#984)
  try {
    Html5.TEST_VID['volume'] = 0.5;
  } catch (e) {
    return false;
  }

  return !!Html5.TEST_VID.canPlayType;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Html5);

/**
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 * @param  {Object} source   The source object
 * @param  {Html5} tech  The instance of the HTML5 tech
 */
Html5.nativeSourceHandler = {};

/**
 * Check if the video element can handle the source natively
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Html5.nativeSourceHandler.canHandleSource = function(source){
  var match, ext;

  function canPlayType(type){
    // IE9 on Windows 7 without MediaPlayer throws an error here
    // https://github.com/videojs/video.js/issues/519
    try {
      return Html5.TEST_VID.canPlayType(type);
    } catch(e) {
      return '';
    }
  }

  // If a type was provided we should rely on that
  if (source.type) {
    return canPlayType(source.type);
  } else if (source.src) {
    // If no type, fall back to checking 'video/[EXTENSION]'
    ext = Url.getFileExtension(source.src);

    return canPlayType(`video/${ext}`);
  }

  return '';
};

/**
 * Pass the source to the video element
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 * @param  {Object} source    The source object
 * @param  {Html5} tech   The instance of the Html5 tech
 */
Html5.nativeSourceHandler.handleSource = function(source, tech){
  tech.setSrc(source.src);
};

/**
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Html5.nativeSourceHandler.dispose = function(){};

// Register the native source handler
Html5.registerSourceHandler(Html5.nativeSourceHandler);

/**
 * Check if the volume can be changed in this browser/device.
 * Volume cannot be changed in a lot of mobile devices.
 * Specifically, it can't be changed from 1 on iOS.
 * @return {Boolean}
 */
Html5.canControlVolume = function(){
  var volume =  Html5.TEST_VID.volume;
  Html5.TEST_VID.volume = (volume / 2) + 0.1;
  return volume !== Html5.TEST_VID.volume;
};

/**
 * Check if playbackRate is supported in this browser/device.
 * @return {[type]} [description]
 */
Html5.canControlPlaybackRate = function(){
  var playbackRate = Html5.TEST_VID.playbackRate;
  Html5.TEST_VID.playbackRate = (playbackRate / 2) + 0.1;
  return playbackRate !== Html5.TEST_VID.playbackRate;
};

/**
 * Check to see if native text tracks are supported by this browser/device
 * @return {Boolean}
 */
Html5.supportsNativeTextTracks = function() {
  var supportsTextTracks;

  // Figure out native text track support
  // If mode is a number, we cannot change it because it'll disappear from view.
  // Browsers with numeric modes include IE10 and older (<=2013) samsung android models.
  // Firefox isn't playing nice either with modifying the mode
  // TODO: Investigate firefox: https://github.com/videojs/video.js/issues/1862
  supportsTextTracks = !!Html5.TEST_VID.textTracks;
  if (supportsTextTracks && Html5.TEST_VID.textTracks.length > 0) {
    supportsTextTracks = typeof Html5.TEST_VID.textTracks[0]['mode'] !== 'number';
  }
  if (supportsTextTracks && browser.IS_FIREFOX) {
    supportsTextTracks = false;
  }

  return supportsTextTracks;
};

/**
 * Set the tech's volume control support status
 * @type {Boolean}
 */
Html5.prototype['featuresVolumeControl'] = Html5.canControlVolume();

/**
 * Set the tech's playbackRate support status
 * @type {Boolean}
 */
Html5.prototype['featuresPlaybackRate'] = Html5.canControlPlaybackRate();

/**
 * Set the tech's status on moving the video element.
 * In iOS, if you move a video element in the DOM, it breaks video playback.
 * @type {Boolean}
 */
Html5.prototype['movingMediaElementInDOM'] = !browser.IS_IOS;

/**
 * Set the the tech's fullscreen resize support status.
 * HTML video is able to automatically resize when going to fullscreen.
 * (No longer appears to be used. Can probably be removed.)
 */
Html5.prototype['featuresFullscreenResize'] = true;

/**
 * Set the tech's progress event support status
 * (this disables the manual progress events of the Tech)
 */
Html5.prototype['featuresProgressEvents'] = true;

/**
 * Sets the tech's status on native text track support
 * @type {Boolean}
 */
Html5.prototype['featuresNativeTextTracks'] = Html5.supportsNativeTextTracks();

// HTML5 Feature detection and Device Fixes --------------------------------- //
let canPlayType;
const mpegurlRE = /^application\/(?:x-|vnd\.apple\.)mpegurl/i;
const mp4RE = /^video\/mp4/i;

Html5.patchCanPlayType = function() {
  // Android 4.0 and above can play HLS to some extent but it reports being unable to do so
  if (browser.ANDROID_VERSION >= 4.0) {
    if (!canPlayType) {
      canPlayType = Html5.TEST_VID.constructor.prototype.canPlayType;
    }

    Html5.TEST_VID.constructor.prototype.canPlayType = function(type) {
      if (type && mpegurlRE.test(type)) {
        return 'maybe';
      }
      return canPlayType.call(this, type);
    };
  }

  // Override Android 2.2 and less canPlayType method which is broken
  if (browser.IS_OLD_ANDROID) {
    if (!canPlayType) {
      canPlayType = Html5.TEST_VID.constructor.prototype.canPlayType;
    }

    Html5.TEST_VID.constructor.prototype.canPlayType = function(type){
      if (type && mp4RE.test(type)) {
        return 'maybe';
      }
      return canPlayType.call(this, type);
    };
  }
};

Html5.unpatchCanPlayType = function() {
  var r = Html5.TEST_VID.constructor.prototype.canPlayType;
  Html5.TEST_VID.constructor.prototype.canPlayType = canPlayType;
  canPlayType = null;
  return r;
};

// by default, patch the video element
Html5.patchCanPlayType();

Html5.disposeMediaElement = function(el){
  if (!el) { return; }

  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }

  // remove any child track or source nodes to prevent their loading
  while(el.hasChildNodes()) {
    el.removeChild(el.firstChild);
  }

  // remove any src reference. not setting `src=''` because that causes a warning
  // in firefox
  el.removeAttribute('src');

  // force the media element to update its loading state by calling load()
  // however IE on Windows 7N has a bug that throws an error so need a try/catch (#793)
  if (typeof el.load === 'function') {
    // wrapping in an iife so it's not deoptimized (#1060#discussion_r10324473)
    (function() {
      try {
        el.load();
      } catch (e) {
        // not supported
      }
    })();
  }
};

Component.registerComponent('Html5', Html5);
export default Html5;
