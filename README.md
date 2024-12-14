# Separation of Concerns in Web Component Definitions
This repository provides a minimal `webpack` starter for splitting [custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) definitions of [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) into separate JS, HTML, and CSS files. It uses webpack's `html-loader` to import HTML and CSS at build time.

tl;dr: [run it](#run-it)

# About
## Motivation
I like web components. It bothers me that the structure (HTML) and styling (CSS) is most often defined inline with the interactivity (JavaScript) when defining custom elements. The resulting developer experience is bad. It's hard to read. There is no [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) (SoC).

I have not found a comprehensive, framework agnostic example of how to achieve SoC when defining custom components using web components. Hence this repo.

## State of the Art
A StackOverflow poster previously [proposed to use `fetch()`](https://stackoverflow.com/questions/55080103/how-to-separate-web-components-to-individual-files-and-load-them) to pull separate HTML into JS web component definition. While relatively easy to achieve, this is not optimal; as it introduces overhead and worse performance at runtime.

There is one [article on medium.com](https://roshan-khandelwal.medium.com/web-components-c7aef23fe478) that describes a similar approach to the one demonstrated here; however, it does not provide an executable demonstration, as far as I am aware.

## Caveats
The present approach is arguably less elegant than programmatically generating the elements of the web component in JS; because it requires to query the shadow DOM for any elements we want to reference with JS. When programmatically adding elements to our web component, we would be able to keep their references for later use. However, for me personally the developer experience is worth this trade off.

## Outlook
There is an [ongoing proposal](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/html-modules-explainer.md) to enable importing of HTML in JavaScript natively. If this proposal ever finds widespread adoption, `webpack` would no longer be necessary to achieve the structure of this repo.

# Project Structure
This project defines a single web component in `src/components/dialog-with-button/`. `dialog-with-button.js` holds the actual component definition. It imports `dialog-with-button.html` and `dialog-with-button.css`; then adds both to the component's shadow DOM.

The web component is imported in `main.js`, which serves as the entry point for `webpack`. This structure provides a scaffold to easily add more web components (which would simply be added as imports in `main.js`).

## Dependencies
- `webpack` (though I assume that the same result can be achieved with other bundlers; e.g., `rollup`)
- `html-loader` and `css-loader` to import HTML and CSS, respectively, into the JS component definition.

There are no other mandatory dependencies.

This repository uses two optional dependencies for demonstration purposes only:
1. `webpack-dev-server` to easily run the project and show the web component live.
1. `html-webpack-plugin` to process `index.html` and automatically link the bundled JS.

# Run It
After cloning / downloading, run `pnpm install` (or `npm install` or `yarn install` ... you do you).

You may use `pnpm serve` to start a dev server, which you can access at http://localhost:8080/.

Run `pnpm build` to build the web component bundle and demo page in production mode. `main.bundle.js` holds the bundled web component. You can open `index.html` in the `/dist` folder with your browser to verify.
