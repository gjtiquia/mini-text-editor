# Mini Text Editor

## Dev Commands

`npm install`: Installs all required dependencies.

## TODO

- textarea turn off spellcheck

- state should go back to client side...?
  - mostly cuz wanna hv multiple windows
  - client would be just querying
  - file server would then be stateless

## Syntax Highlight Notes

- CodeInput: `<textarea/>` + `<pre><code/></pre>` + prismJS/highlightJS
  - [Blog Post](https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/)
  - [GitHub Repo](https://github.com/WebCoder49/code-input)
  - [react-code-input](https://github.com/srsholmes/react-code-input)
    - Inspired by CodeInput from Oliver Geer (WebCoder49)

- remarkJS
  - [react-markdown](https://github.com/remarkjs/react-markdown)
    - [Demo Page](https://remarkjs.github.io/react-markdown/)
    - [Demo Page JS](https://github.com/remarkjs/react-markdown/blob/website/src/index.js)
    - [Demo Page CSS](https://github.com/remarkjs/react-markdown/blob/website/src/index.css)
      - Basically similar technique to CodeInput, `<textarea/>` but with `<div/>` instead
      - Includes all-in-one package for parsing markdown to html
     
- Shiki
  - [Shiki Style](https://shiki.style/)
    - [Playground](https://shiki.style/guide/#playground)
      - Runtime syntax highlighting
      - in chrome dev tools shows that it uses `<textarea/>` and `<pre><code/></pre>` as well  
