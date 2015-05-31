import document from 'global/document';
import * as setup from './setup';
import Component from './component';
import globalOptions from './global-options.js';
import Player from './player';
import plugin from './plugins.js';
import mergeOptions from '../../src/js/utils/merge-options.js';

import assign from 'object.assign';
import log from './utils/log.js';
import * as Dom from './utils/dom.js';
import * as browser from './utils/browser.js';
import extendsFn from './extends.js';
import merge from 'lodash-compat/object/merge';

// Include the built-in techs
import Html5 from './tech/html5.js';
import Flash from './tech/flash.js';

// HTML5 Element Shim for IE8
if (typeof HTMLVideoElement === 'undefined') {
  document.createElement('video');
  document.createElement('audio');
  document.createElement('track');
}

/**
 * Doubles as the main function for users to create a player instance and also
 * the main library object.
 *
 * The `videojs` function can be used to initialize or retrieve a player.
 *
 *     var myPlayer = videojs('my_video_id');
 *
 * @param  {String|Element} id      Video element or video element ID
 * @param  {Object=} options        Optional options object for config/settings
 * @param  {Function=} ready        Optional ready callback
 * @return {Player}             A player instance
 * @namespace
 */
var videojs = function(id, options, ready){
  var tag; // Element of ID

  // Allow for element or ID to be passed in
  // String ID
  if (typeof id === 'string') {

    // Adjust for jQuery ID syntax
    if (id.indexOf('#') === 0) {
      id = id.slice(1);
    }

    // If a player instance has already been created for this ID return it.
    if (Player.players[id]) {

      // If options or ready funtion are passed, warn
      if (options) {
        log.warn(`Player "${id}" is already initialised. Options will not be applied.`);
      }

      if (ready) {
        Player.players[id].ready(ready);
      }

      return Player.players[id];

    // Otherwise get element for ID
    } else {
      tag = Dom.getEl(id);
    }

  // ID is a media element
  } else {
    tag = id;
  }

  // Check for a useable element
  if (!tag || !tag.nodeName) { // re: nodeName, could be a box div also
    throw new TypeError('The element or ID supplied is not valid. (videojs)'); // Returns
  }

  // Element may have a player attr referring to an already created player instance.
  // If not, set up a new player and return the instance.
  return tag['player'] || new Player(tag, options, ready);
};

// Run Auto-load players
// You have to wait at least once in case this script is loaded after your video in the DOM (weird behavior only with minified version)
setup.autoSetupTimeout(1, videojs);

/**
 * Current software version (semver)
 * @type {String}
 */
videojs['VERSION'] = '__VERSION__';

/**
 * Get the global options object
 *
 * @returns {Object} The global options object
 */
videojs.getGlobalOptions = () => globalOptions;

/**
 * Set options that will apply to every player
 *
 *     videojs.setGlobalOptions({
 *       autoplay: true
 *     });
 *     // -> all players will autoplay by default
 *
 * NOTE: This will do a deep merge with the new options,
 * not overwrite the entire global options object.
 *
 * @returns {Object} The updated global options object
 */
videojs.setGlobalOptions = function(newOptions) {
  return mergeOptions(globalOptions, newOptions);
};

// Set CDN Version of swf
const MINOR_VERSION = '__VERSION_NO_PATCH__';
const ACCESS_PROTOCOL = ('https:' === document.location.protocol ? 'https://' : 'http://');

// The added (+) blocks the replace from changing this _VERSION_NO_PATCH_ string
if (MINOR_VERSION !== '__VERSION_'+'NO_PATCH__') {
  globalOptions['flash']['swf'] = `${ACCESS_PROTOCOL}vjs.zencdn.net/${MINOR_VERSION}/video-js.swf`;
}

/**
 * Get an object with the currently created players, keyed by player ID
 *
 * @returns {Object} The created players
 */
videojs.getPlayers = function() {
  return Player.players;
};

/**
 * Get a component class object by name
 *
 *     var VjsButton = videojs.getComponent('Button');
 *
 *     // Create a new instance of the component
 *     var myButton = new VjsButton(myPlayer);
 *
 */
videojs.getComponent = Component.getComponent;

/**
 * Register a component so it can referred to by name
 *
 * Used when adding to other
 * components, either through addChild
 * `component.addChild('myComponent')`
 * or through default children options
 * `{ children: ['myComponent'] }`.
 *
 *     // Get a component to subclass
 *     var VjsButton = videojs.getComponent('Button');
 *
 *     // Subclass the component (see 'extends' doc for more info)
 *     var MySpecialButton = videojs.extends(VjsButton, {});
 *
 *     // Register the new component
 *     VjsButton.registerComponent('MySepcialButton', MySepcialButton);
 *
 *     // (optionally) add the new component as a default player child
 *     myPlayer.addChild('MySepcialButton');
 *
 * NOTE: You could also just initialize the component before adding.
 * `component.addChild(new MyComponent());`
 *
 * @param {String} The class name of the component
 * @param {Component} The component class
 * @returns {Component} The newly registered component
 */
videojs.registerComponent = Component.registerComponent;

/**
 * A suite of browser and device tests
 * @type {Object}
 */
videojs.browser = browser;

/**
 * Subclass an existing class
 * Mimics ES6 subclassing with the `extends` keyword
 *
 *     // Create a basic javascript 'class'
 *     function MyClass(name){
 *       // Set a property at initialization
 *       this.myName = name;
 *     }
 *
 *     // Create an instance method
 *     MyClass.prototype.sayMyName = function(){
 *       alert(this.myName);
 *     };
 *
 *     // Subclass the exisitng class and change the name
 *     // when initializing
 *     var MySubClass = videojs.extends(MyClass, {
 *       constructor: function(name) {
 *         // Call the super class constructor for the subclass
 *         MyClass.call(this, name)
 *       }
 *     });
 *
 *     // Create an instance of the new sub class
 *     var myInstance = new MySubClass('John');
 *     myInstance.sayMyName(); // -> should alert "John"
 *
 * @param {Function} The Class to subclass
 * @param {Object} An object including instace methods for the new class
 *                   Optionally including a `constructor` function
 *
 * @returns {Function} The newly created subclass
 */
videojs.extends = extendsFn;

/**
 * Merge two options objects recursively
 * Performs a deep merge like lodash.merge but **only merges plain objects**
 * (not arrays, elements, anything else)
 * Other values will be copied directly from the second object.
 *
 *     var defaultOptions = {
 *       foo: true,
 *       bar: {
 *         a: true,
 *         b: [1,2,3]
 *       }
 *     };
 *     var newOptions = {
 *       foo: false,
 *       bar: {
 *         b: [4,5,6]
 *       }
 *     };
 *
 *     var result = videojs.mergeOptions(defaultOptions, newOptions);
 *     // result.foo = false;
 *     // result.bar.a = true;
 *     // result.bar.b = [4,5,6];
 *
 * @param {Object} The options object whose values will be overriden
 * @param {Object} The options object with values to override the first
 * @param {Object} Any number of additional options objects
 *
 * @returns {Object} a new object with the merged values
 */
videojs.mergeOptions = mergeOptions;

/**
 * Create a Video.js player plugin
 *
 * Plugins are only initialized when options for the plugin are included
 * in the player options, or the plugin function on the player instance is
 * called.
 *
 * **See the plugin guide in the docs for a more detailed example**
 *
 *     // Make a plugin that alerts when the player plays
 *     videojs.plugin('myPlugin', function(myPluginOptions) {
 *       myPluginOptions = myPluginOptions || {};
 *
 *       var player = this;
 *       var alertText = myPluginOptions.text || 'Player is playing!'
 *
 *       player.on('play', function(){
 *         alert(alertText);
 *       });
 *     });
 *
 *     // USAGE EXAMPLES
 *
 *     // EXAMPLE 1: New player with plugin options, call plugin immediately
 *     var player1 = videojs('idOne', {
 *       myPlugin: {
 *         text: 'Custom text!'
 *       }
 *     });
 *     // Click play
 *     // --> Should alert 'Custom text!'
 *
 *     // EXAMPLE 3: New player, initialize plugin later
 *     var player3 = videojs('idThree');
 *     // Click play
 *     // --> NO ALERT
 *     // Click pause
 *     // Initialize plugin using the plugin function on the player instance
 *     player3.myPlugin({
 *       text: 'Plugin added later!'
 *     });
 *     // Click play
 *     // --> Should alert 'Plugin added later!'
 *
 * @param {String} The plugin name
 * @param {Function} The plugin function that will be called with options
 */
videojs.plugin = plugin;

/**
 * Adding languages so that they're available to all players.
 *
 *     videojs.addLanguage('es', { 'Hello': 'Hola' });
 *
 * @param  {String} code The language code or dictionary property
 * @param  {Object} data The data values to be translated
 *
 * @return {Object} The resulting language dictionary object
 */
videojs.addLanguage = function(code, data){
  code = ('' + code).toLowerCase();
  return merge(globalOptions.languages, { [code]: data })[code];
};

// REMOVING: We probably should add this to the migration plugin
// // Expose but deprecate the window[componentName] method for accessing components
// Object.getOwnPropertyNames(Component.components).forEach(function(name){
//   let component = Component.components[name];
//
//   // A deprecation warning as the constuctor
//   module.exports[name] = function(player, options, ready){
//     log.warn('Using videojs.'+name+' to access the '+name+' component has been deprecated. Please use videojs.getComponent("componentName")');
//
//     return new Component(player, options, ready);
//   };
//
//   // Allow the prototype and class methods to be accessible still this way
//   // Though anything that attempts to override class methods will no longer work
//   assign(module.exports[name], component);
// });

/**
 * Custom Universal Module Definition (UMD)
 *
 * Video.js will never be a non-browser lib so we can simplify UMD a bunch and
 * still support requirejs and browserify. This also needs to be closure
 * compiler compatible, so string keys are used.
 */
if (typeof define === 'function' && define['amd']) {
  define('videojs', [], function(){ return videojs; });

// checking that module is an object too because of umdjs/umd#35
} else if (typeof exports === 'object' && typeof module === 'object') {
  module['exports'] = videojs;
}

export default videojs;
