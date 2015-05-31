import Component from '../component';
import window from 'global/window';
import toTitleCase from '../utils/to-title-case.js';

/**
 * The Media Loader is the component that decides which playback technology to load
 * when the player is initialized.
 *
 * @constructor
 */
class MediaLoader extends Component {

  constructor(player, options, ready){
    super(player, options, ready);

    // If there are no sources when the player is initialized,
    // load the first supported playback technology.
    if (!player.options_['sources'] || player.options_['sources'].length === 0) {
      for (let i=0, j=player.options_['techOrder']; i<j.length; i++) {
        let techName = toTitleCase(j[i]);
        let tech = Component.getComponent(techName);

        // Check if the browser supports this technology
        if (tech && tech.isSupported()) {
          player.loadTech(techName);
          break;
        }
      }
    } else {
      // // Loop through playback technologies (HTML5, Flash) and check for support.
      // // Then load the best source.
      // // A few assumptions here:
      // //   All playback technologies respect preload false.
      player.src(player.options_['sources']);
    }
  }
}

Component.registerComponent('MediaLoader', MediaLoader);
export default MediaLoader;
