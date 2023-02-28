import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/meme-maker/meme-maker.js";

const characterImage = new URL("../assets/character.png", import.meta.url).href;

export class CharacterCard extends LitElement {
  static get properties() {
    return {
      characterName: {
        type: String,
        reflect: true,
      },
      characterBio: {
        type: String,
      },
      accentColor: {
        type: String,
        reflect: true,
        attribute: 'accent-color'
      },
      meme: {
        type: String
      },
      topText: {
        type: String
      }
    };
  }

  static get styles() {
    return css`
      :host([accent-color="orange"]) .container {
        background-color: var(--character-card-accent-color, orange);
        color: white;
        display: inline-block;
      }
      :host([accent-color="yellow"]) .container {
        background-color: var(--character-card-accent-color, yellow);
        color: black;
        display: inline-block;
      }
      :host([accent-color="red"]) .container {
        background-color: var(--character-card-accent-color, red);
        color: white;
        display: inline-block;
      }
      .wrapper {
        text-align: center;
        max-width: 400px;
        margin: 16px;
      }

      .image {
        height: auto;
        width: 200px;
        padding: 8px;
      }

      .header {
        font-size: 60px;
        margin: 8px;
        font-family: Arial, Helvetica, sans-serif;
      }

      .details {
        font-size: 20px;
        margin: 16px 8px 8px;
        border: 3px solid #555;
      }

      .details summary {
        font-size: 20px;
        font-weight: bold;
      }

      @media only screen and (max-width: 500px) {
        .details {
          display: none;
        }
      }

      @media only screen and (min-width: 800px) {
        .details {
          display: none;
        }
      }

      @media screen and (max-width: 500px) {
        .wrapper {
          width: 300px;
          height: auto;
        }
        .header {
          font-size: 35px;
        }
        .details {
          font-size: 16px;
        }
      }

      .buttons button:hover {
        background-color: pink;
        color: red;
      }

      .buttons button:focus {
        background-color: green;
      }

      .container {
        background-color: orange;
        padding: 16px;
        border-radius: 8px;
      }
    `;
  }

  constructor() {
    super();
    this.meme = "https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg";
    this.accentColor = null;
    this.characterName = "Pikachu";
    this.characterBio =
      "Pikachu, the Mouse Pokémon. It can generate electric attacks from " +
      " the electric pouches located in both of its cheeks.";
    this.topText = "When you forgot to do the weekly assignments";
  }

  toggleDetails() {
    this.shadowRoot.querySelector(".details").toggleAttribute("open");
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h4>${this.characterName}</h4>
          </div>
          <img class="image" src="${characterImage}" />
          <details class="details">
            <slot></slot>
            <p>${this.characterBio}</p>
            <meme-maker
              alt="suprised pikachu"
              image-url="${this.meme}"
              top-text="${this.topText}"
            ></meme-maker>
          </details>
          <my-tag background-color="orange"></my-tag>
        </div>
      </div>
    `;
  }
}

class MyTag extends HTMLElement {
  /**
   * This is a convention, not the standard
   */
  static get tag() {
    return "my-tag";
  }
  /**
   * object life cycle
   */
  constructor() {
    super();
    this.backgroundColor = "orange";
    // create a template element for processing shadowRoot
    this.template = document.createElement("template");
    // create a shadowRoot
    this.attachShadow({ mode: "open" });
    this.render();
  }
  // render HTML
  get html() {
    return `
      <style>
        :host {
          display: inline-block;
          color: blue;
          background-color: ${this.backgroundColor};
        }
      </style>
    `;
  }
  /**
   * life cycle, element is afixed to the DOM
   */
  connectedCallback() {
    if (window.ShadyCSS) {
      window.ShadyCSS.styleElement(this);
    }
    this.addEventListener("click", () => {
      if (this.backgroundColor === "orange") {
        this.backgroundColor = "yellow";
      } else {
        this.backgroundColor = "orange";
      }
      this.render();
    });
  }
  /**
   * Render / rerender the shadowRoot
   */
  render() {
    this.dispatchEvent(
      new CustomEvent("rerender-mytag-please", {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          value: this.text,
        },
      })
    );
    this.shadowRoot.innerHTML = null;
    this.template.innerHTML = this.html;
    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(this.template, this.tag);
    }
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }
  /**
   * attributes to notice changes to
   */
  static get observedAttributes() {
    return ["text"];
  }
  set text(val) {
    this.setAttribute("text", val);
  }
  get text() {
    return this.getAttribute("text");
  }
}

customElements.define(MyTag.tag, MyTag);
customElements.define("character-card", CharacterCard);
