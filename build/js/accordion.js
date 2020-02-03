'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @fileOverview
* @author Biagio Ruotolo
* @version 1.0.0
*/

/**
* Docebo frontend assignment.
* Reusable javascript accordion.
*
* @class Accordion
*/
var Accordion = function () {

	/**
 * Creates an instance of Accordion.
 * @param {Object} options - Accordion information.
 * @param {string} options.container - HTML id of the accordion's container.string
 * @param {string=} options.mainTitle - HTML id of the accordion's container.string
 * @param {Object[]} options.panels - Array of accordion's panels.
 * @param {string} options.panels.title - Panel's title
 * @param {string=} options.panels.subtitle - Panel's subtitle
 * @param {string} options.panels.content - HTML panel's content
 * @memberof Accordion
 */
	function Accordion(options) {
		var _this = this;

		_classCallCheck(this, Accordion);

		window.addEventListener('load', function () {
			if (options) {
				_this.options = options;
				_this.panelContainerClassName = 'accordion__panel-container';
				_this.contentContainerClassName = 'accordion__content';
				_this.render();
			}
		});
	}

	/**
  * Renders the accordion based on the given options
  */


	_createClass(Accordion, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			// all the html code that represents the accordion
			var panelsHTML = '';
			// gets the accordion container
			this.myAccordionContainer = document.getElementById(this.options.container);
			this.myAccordionContainer.classList.toggle('accordion');

			// iterates accordion's panels and generate the HTML code for each one
			this.options.panels.forEach(function (panel, i) {
				var panelHasDescription = panel.subtitle ? true : false;
				var panelDescriptionClass = panelHasDescription ? 'with-desc' : 'no-desc';

				panelsHTML += '\n\t\t\t\t<div class="' + _this2.panelContainerClassName + '">\n\t\t\t\t\t<div class="accordion__panel accordion__panel--' + panelDescriptionClass + '">\n\t\t\t\t\t\t<div class="accordion__title-container">\n\t\t\t\t\t\t\t<span class="accordion__title">' + panel.title + '</span>\n\t\t\t\t\t\t\t' + (panelHasDescription ? '<span class="accordion__subtitle">' + panel.subtitle + '</span>' : '') + '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<i class="accordion__toggle-icon material-icons">keyboard_arrow_down</i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="' + _this2.contentContainerClassName + '">' + panel.content + '</div>\n\t\t\t\t</div>\n\t\t\t';
			});

			// sets accordion header, if present
			if (this.options.mainTitle) {
				this.myAccordionContainer.insertAdjacentHTML('beforeend', '\n\t\t\t\t<header class="accordion__main-title">' + this.options.mainTitle + '</header>\n\t\t\t');
			}
			// injects panels' HTML code
			this.myAccordionContainer.insertAdjacentHTML('beforeend', panelsHTML);

			// attach event listener to the accordion only one time
			this.myAccordionContainer.addEventListener('click', function (e) {
				return _this2.onClick(e);
			});
		}

		/**
      * Click event listener's callback. 
   * Handles clicks on the accordion.
      *
      * @param {object} e - Element the click occured on.
      */

	}, {
		key: 'onClick',
		value: function onClick(e) {
			// look up the DOM tree from the current element and returns the closest ancestor with 'accordion__panel-container' class
			// const clickedElement = e.target.closest(`.${this.panelContainerClassName}`);

			var clickedElement = this.findAncestor(e.target, '' + this.panelContainerClassName);

			if (clickedElement) {
				var clickedContentElement = clickedElement.getElementsByClassName('' + this.contentContainerClassName)[0];
				this.toggleClickedPanel(clickedElement, clickedContentElement);
			}
		}

		/**
   * Toggles corresponding content for each panel clicked.
   *
   * @param {Object} clickedElement - The panel's container element.
   * @param {Object} clickedContentElement - The content panel to show or hide.
   */

	}, {
		key: 'toggleClickedPanel',
		value: function toggleClickedPanel(clickedElement, clickedContentElement) {
			if (!clickedElement.classList.contains(this.panelContainerClassName + '--active')) {
				this.closeAllPanels();
			}

			clickedElement.classList.toggle(this.panelContainerClassName + '--active');
			if (clickedContentElement.style.height === '0px' || clickedContentElement.style.height === '') {
				clickedContentElement.style.height = 'unset';
			} else {
				clickedContentElement.style.height = 0;
			}
		}

		/**
   * Closes all the opened panels
   */

	}, {
		key: 'closeAllPanels',
		value: function closeAllPanels() {
			var accordionPanels = this.myAccordionContainer.getElementsByClassName('' + this.contentContainerClassName);
			for (var i = 0; i < accordionPanels.length; i++) {
				var panel = accordionPanels[i];
				panel.style.height = '0px';
			}
			var contents = this.myAccordionContainer.getElementsByClassName(this.panelContainerClassName + '--active');
			for (var _i = 0; _i < contents.length; _i++) {
				var content = contents[_i];
				content.classList.remove(this.panelContainerClassName + '--active');
			}
		}
	}, {
		key: 'findAncestor',
		value: function findAncestor(el, cls) {
			while ((el = el.parentElement) && !el.classList.contains(cls)) {}
			return el;
		}
	}]);

	return Accordion;
}();
