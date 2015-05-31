import Component from '../component.js';
import * as Dom from '../utils/dom.js';
import roundFloat from '../utils/round-float.js';
import document from 'global/document';
import assign from 'object.assign';

/* Slider
================================================================================ */
/**
 * The base functionality for sliders like the volume bar and seek bar
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @constructor
 */
class Slider extends Component {

  constructor(player, options) {
    super(player, options);

    // Set property names to bar and handle to match with the child Slider class is looking for
    this.bar = this.getChild(this.options_['barName']);
    this.handle = this.getChild(this.options_['handleName']);

    // Set a horizontal or vertical class on the slider depending on the slider type
    this.vertical(!!this.options()['vertical']);

    this.on('mousedown', this.handleMouseDown);
    this.on('touchstart', this.handleMouseDown);
    this.on('focus', this.handleFocus);
    this.on('blur', this.handleBlur);
    this.on('click', this.handleClick);

    this.on(player, 'controlsvisible', this.update);
    this.on(player, this.playerEvent, this.update);
  }

  createEl(type, props={}) {
    // Add the slider element class to all sub classes
    props.className = props.className + ' vjs-slider';
    props = assign({
      'role': 'slider',
      'aria-valuenow': 0,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      tabIndex: 0
    }, props);

    return super.createEl(type, props);
  }

  handleMouseDown(event) {
    event.preventDefault();
    Dom.blockTextSelection();
    this.addClass('vjs-sliding');

    this.on(document, 'mousemove', this.handleMouseMove);
    this.on(document, 'mouseup', this.handleMouseUp);
    this.on(document, 'touchmove', this.handleMouseMove);
    this.on(document, 'touchend', this.handleMouseUp);

    this.handleMouseMove(event);
  }

  // To be overridden by a subclass
  handleMouseMove() {}

  handleMouseUp() {
    Dom.unblockTextSelection();
    this.removeClass('vjs-sliding');

    this.off(document, 'mousemove', this.handleMouseMove);
    this.off(document, 'mouseup', this.handleMouseUp);
    this.off(document, 'touchmove', this.handleMouseMove);
    this.off(document, 'touchend', this.handleMouseUp);

    this.update();
  }

  update() {
    // In VolumeBar init we have a setTimeout for update that pops and update to the end of the
    // execution stack. The player is destroyed before then update will cause an error
    if (!this.el_) return;

    // If scrubbing, we could use a cached value to make the handle keep up with the user's mouse.
    // On HTML5 browsers scrubbing is really smooth, but some flash players are slow, so we might want to utilize this later.
    // var progress =  (this.player_.scrubbing) ? this.player_.getCache().currentTime / this.player_.duration() : this.player_.currentTime() / this.player_.duration();
    let progress = this.getPercent();
    let bar = this.bar;

    // If there's no bar...
    if (!bar) return;

    // Protect against no duration and other division issues
    if (typeof progress !== 'number' ||
        progress !== progress ||
        progress < 0 ||
        progress === Infinity) {
          progress = 0;
    }

    // Convert to a percentage for setting
    let percentage = roundFloat(progress * 100, 2) + '%';

    // Set the new bar width or height
    if (this.vertical()) {
      bar.el().style.height = percentage;
    } else {
      bar.el().style.width = percentage;
    }
  }

  calculateDistance(event){
    let el = this.el_;
    let box = Dom.findElPosition(el);
    let boxW = el.offsetWidth;
    let boxH = el.offsetHeight;
    let handle = this.handle;

    if (this.options()['vertical']) {
      let boxY = box.top;

      let pageY;
      if (event.changedTouches) {
        pageY = event.changedTouches[0].pageY;
      } else {
        pageY = event.pageY;
      }

      if (handle) {
        var handleH = handle.el().offsetHeight;
        // Adjusted X and Width, so handle doesn't go outside the bar
        boxY = boxY + (handleH / 2);
        boxH = boxH - handleH;
      }

      // Percent that the click is through the adjusted area
      return Math.max(0, Math.min(1, ((boxY - pageY) + boxH) / boxH));

    } else {
      let boxX = box.left;

      let pageX;
      if (event.changedTouches) {
        pageX = event.changedTouches[0].pageX;
      } else {
        pageX = event.pageX;
      }

      if (handle) {
        var handleW = handle.el().offsetWidth;

        // Adjusted X and Width, so handle doesn't go outside the bar
        boxX = boxX + (handleW / 2);
        boxW = boxW - handleW;
      }

      // Percent that the click is through the adjusted area
      return Math.max(0, Math.min(1, (pageX - boxX) / boxW));
    }
  }

  handleFocus() {
    this.on(document, 'keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    if (event.which === 37 || event.which === 40) { // Left and Down Arrows
      event.preventDefault();
      this.stepBack();
    } else if (event.which === 38 || event.which === 39) { // Up and Right Arrows
      event.preventDefault();
      this.stepForward();
    }
  }

  handleBlur() {
    this.off(document, 'keydown', this.handleKeyPress);
  }

  /**
   * Listener for click events on slider, used to prevent clicks
   *   from bubbling up to parent elements like button menus.
   * @param  {Object} event Event object
   */
  handleClick(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }

  vertical(bool) {
    if (bool === undefined) {
      return this.vertical_ || false;
    }

    this.vertical_ = !!bool;

    if (this.vertical_) {
      this.addClass('vjs-slider-vertical');
    } else {
      this.addClass('vjs-slider-horizontal');
    }

    return this;
  }

}

Component.registerComponent('Slider', Slider);
export default Slider;
