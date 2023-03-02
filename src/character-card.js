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
        attribute: "accent-color",
      },
      meme: {
        type: String,
      },
      topText: {
        type: String,
      },
      opened: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        vertical-align: text-top;

      }

      :host([accent-color="orange"]) .container {
        background-color: var(--character-card-accent-color, orange);
        color: white;
      }
      :host([accent-color="yellow"]) .container {
        background-color: var(--character-card-accent-color, yellow);
        color: black;
      }
      :host([accent-color="red"]) .container {
        background-color: var(--character-card-accent-color, red);
        color: white;
      }

      .container {
        background-color: orange;
        padding: 16px;
        border-radius: 8px;
        vertical-align: top;
      }

      .wrapper {
        text-align: center;
        max-width: 400px;
        margin: 16px;
        vertical-align: top;
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
    `;
  }

  constructor() {
    super();
    this.characterName = "Pikachu";
    this.characterBio =
      "Pikachu, the Mouse Pokémon. It can generate electric attacks from " +
      " the electric pouches located in both of its cheeks.";
    this.topText = "When you forgot to do the weekly assignments";
    this.opened = false;
  }

  toggleEvent() {
    const state =
      this.shadowRoot.querySelector("details").getAttribute("open") === ""
        ? true
        : false;
    this.opened = state;
    console.log(this.opened);
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "opened") {
        this.dispatchEvent(
          new CustomEvent("opened-changed", {
            composed: true,
            bubbles: true,
            cancelable: false,
            detail: { value: this[propName] },
          })
        );
        console.log(`${propName} changed. oldValue: ${oldValue}`);
      }
    });
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h4>${this.characterName}</h4>
          </div>

          <!-- Image -->
          <img class="image" src="${characterImage}" />

          <!-- Details -->
          <details
            class="details"
            .open="${this.opened}"
            @toggle="${this.toggleEvent}"
          >
            <summary>Click to see more</summary>
            <p>${this.characterBio}</p>
            <slot></slot>
          </details>

          <!-- meme maker -->
          <card-meme-maker></card-meme-maker>
        </div>
      </div>
    `;
  }
}

customElements.define("character-card", CharacterCard);
