import Component from '../../component.js';
import * as Dom from '../../utils/dom.js';
import formatTime from '../../utils/format-time.js';

/**
 * Displays the duration
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */
class DurationDisplay extends Component {

  constructor(player, options){
    super(player, options);

    // this might need to be changed to 'durationchange' instead of 'timeupdate' eventually,
    // however the durationchange event fires before this.player_.duration() is set,
    // so the value cannot be written out using this method.
    // Once the order of durationchange and this.player_.duration() being set is figured out,
    // this can be updated.
    this.on(player, 'timeupdate', this.updateContent);
  }

  createEl() {
    let el = super.createEl('div', {
      className: 'vjs-duration vjs-time-control vjs-control'
    });

    this.contentEl_ = Dom.createEl('div', {
      className: 'vjs-duration-display',
      innerHTML: `<span class="vjs-control-text">${this.localize('Duration Time')}</span> 0:00`, // label the duration time for screen reader users
      'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
    });

    el.appendChild(this.contentEl_);
    return el;
  }

  updateContent() {
    let duration = this.player_.duration();
    if (duration) {
      let localizedText = this.localize('Duration Time');
      let formattedTime = formatTime(duration);
      this.contentEl_.innerHTML = `<span class="vjs-control-text">${localizedText}</span> ${formattedTime}`; // label the duration time for screen reader users
    }
  }

}

Component.registerComponent('DurationDisplay', DurationDisplay);
export default DurationDisplay;
