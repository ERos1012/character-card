import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/meme-maker/meme-maker.js";

const characterImage = new URL("../assets/character.png", import.meta.url).href;
const memeImage = new URL("../assets/meme.jpg", import.meta.url).href;

export class CharacterCard extends LitElement {
  static get properties() {
    return {
      characterName: {
        type: String,
        reflect: true,
      },
      shiny: {
        type: Boolean,
      },
      characterBio: {
        type: String,
      },
    };
  }

  static get styles() {
    return css`
      :host([shiny]) .all {
        background-color: var(--character-card-shiny-background-color, yellow);
        border: 2px solid var(--character-card-shiny-border-color, black);
      }
      .wrapper {
        text-align: center;
        background-color: orange;
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

      /* attempt of adding CSS to meme maker (DOES NOT WORK)*/
      img {
        width: 20%;
        height: auto;
      }
      .bottom-text {
        position: absolute;
        left: 0;
        width: 100%;
        padding: 3% 2%;
        text-align: center;
        letter-spacing: 2px;
        color: red;
      }
    `;
  }

  constructor() {
    super();
    this.characterName = "Pikachu";
    this.shiny = false;
    this.characterBio =
      "Pikachu, the Mouse Pokémon. It can generate electric attacks from " +
      " the electric pouches located in both of its cheeks.";
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
          <my-tag background-color="orange"></my-tag>
          <img class="image" src="${characterImage}"/>
          <details class="details">
            <slot name="bio"></slot>
            <p>${this.characterBio}</p>
            <meme-maker slot="meme" alt="suprised pikachu" image-url="${memeImage}"
            top-text="When you forgot to do the weekly assignments"></meme-maker>
          </details>
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
        span {
          font-style: italic;
        }
      </style>
      <span>${this.text}</span>
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
