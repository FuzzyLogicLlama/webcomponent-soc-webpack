// import HTML and CSS for our web component. This is achieved with
// webpack, using html-loader and css-loader, respectively.
// Both HTML and CSS will be imported as strings.
import html from './dialog-with-button.html';
import css from './dialog-with-button.css';

/** A `<button>` that opens a `<dialog>`. The dialog takes abritrary content via the default `<slot>`.
 * The button text may be set via the `button-text` attribute.
 *
 * The purpose of this component is to showcase definition of a web component under
 * consideration of separation of concerns. */
class DialogWithButton extends HTMLElement {
    #showButton;
    #closeButton;
    #dialog;

    constructor() {
        super();

        // Attach a shadow DOM tree to this instance
        const shadow = this.attachShadow({ mode: 'open' });
        // add the imported HTML to the shadow DOM
        shadow.innerHTML = html;

        // add the imported styles to the shadow DOM
        const style = document.createElement('style');
        style.textContent = css;
        shadow.appendChild(style);

        // get references to some key elements in our component's DOM
        this.#showButton = shadow.querySelector('button[data-id="showButton"]');
        this.#closeButton = shadow.querySelector('button[data-id="closeButton"]');
        this.#dialog = shadow.querySelector('dialog');

        // add event listeners for opening and closing the dialog
        this.#showButton.addEventListener("click", () => {
            this.#dialog.showModal();
        });        
        this.#closeButton.addEventListener("click", () => {
            this.#dialog.close();
        });
    }

    // specify which attributes should be observed for changes
    static get observedAttributes() {
        return ['button-text'];
    }

    // handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        // we only have one attribute of interest
        if (name === 'button-text') this.#updateButtonText(newValue);
    }

    // updates the opening button's text to the given value
    #updateButtonText(newText) {
        if(!this.#showButton) return
        this.#showButton.textContent = newText;
    }
}

 // Define the custom element
customElements.define('dialog-with-button', DialogWithButton);