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
class Accordion {

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
	constructor(options) {
		window.addEventListener('load', () => {
			if (options) {
				this.options = options;
				this.panelContainerClassName = 'accordion__panel-container';
				this.contentContainerClassName = 'accordion__content';
				this.render();
			}
		});
	}

	/**
	 * Renders the accordion based on the given options
	 */
	render() {
		// all the html code that represents the accordion
		let panelsHTML = '';
		// gets the accordion container
		this.myAccordionContainer = document.getElementById(this.options.container);
		this.myAccordionContainer.classList.toggle('accordion');

		// iterates accordion's panels and generate the HTML code for each one
		this.options.panels.forEach((panel, i) => {
			let panelHasDescription = panel.subtitle ? true : false;
			let panelDescriptionClass = panelHasDescription ? 'with-desc' : 'no-desc';

			panelsHTML += `
				<div class="${this.panelContainerClassName}">
					<div class="accordion__panel accordion__panel--${panelDescriptionClass}">
						<div class="accordion__title-container">
							<span class="accordion__title">${panel.title}</span>
							${panelHasDescription ? `<span class="accordion__subtitle">${panel.subtitle}</span>` : ''}
						</div>
						<div>
							<i class="accordion__toggle-icon material-icons">keyboard_arrow_down</i>
						</div>
					</div>
					<div class="${this.contentContainerClassName}">${panel.content}</div>
				</div>
			`;
		});

		// sets accordion header, if present
		if (this.options.mainTitle) {
			this.myAccordionContainer.insertAdjacentHTML('beforeend', `
				<header class="accordion__main-title">${this.options.mainTitle}</header>
			`);
		}
		// injects panels' HTML code
		this.myAccordionContainer.insertAdjacentHTML('beforeend', panelsHTML);

		// attach event listener to the accordion only one time
		this.myAccordionContainer.addEventListener('click', e => this.onClick(e));
	}

	/**
     * Click event listener's callback. 
	 * Handles clicks on the accordion.
     *
     * @param {object} e - Element the click occured on.
     */
	onClick(e) {
		// look up the DOM tree from the current element and returns the closest ancestor with 'accordion__panel-container' class
		const clickedElement = e.target.closest(`.${this.panelContainerClassName}`);
		
		if (clickedElement) {
			let clickedContentElement = clickedElement.getElementsByClassName(`${this.contentContainerClassName}`)[0];
			this.toggleClickedPanel(clickedElement, clickedContentElement);
		}
	}

	/**
	 * Toggles corresponding content for each panel clicked.
	 *
	 * @param {Object} clickedElement - The panel's container element.
	 * @param {Object} clickedContentElement - The content panel to show or hide.
	 */
	toggleClickedPanel(clickedElement, clickedContentElement) {
		if (clickedElement.classList.value.indexOf(`${this.panelContainerClassName}--active`) === -1) {
			this.closeAllPanels();
		}

		clickedElement.classList.toggle(`${this.panelContainerClassName}--active`);
		if (clickedContentElement.style.height === '0px' || clickedContentElement.style.height === '') {
			clickedContentElement.style.height = 'unset';
		} else {
			clickedContentElement.style.height = 0;
		}
	}

	/**
	 * Closes all the opened panels
	 */
	closeAllPanels() {
		const accordionPanels = this.myAccordionContainer.getElementsByClassName(`${this.contentContainerClassName}`);
		for (let panel of accordionPanels) {
			panel.style.height = '0px';
		}
		let contents = this.myAccordionContainer.getElementsByClassName(`${this.panelContainerClassName}--active`);
		for (let content of contents) {
			content.classList.remove(`${this.panelContainerClassName}--active`);
		}
	}
}
