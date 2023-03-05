import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/meme-maker/meme-maker.js";

export class CharacterCard extends LitElement {
  static properties = {
    characterName: {
      type: String,
      reflect: true,
    },
    subtitle: {
      type: String,
    },
    characterBio: {
      type: String,
    },
    accentColor: {
      type: String,
      reflect: true,
      attribute: "accent-color",
    },
    characterImage: {
      type: String,
    },
    topText: {
      type: String,
    },
    bottomText: {
      type: String,
    },
    opened: {
      type: Boolean,
      reflect: true,
    },
  };

  static styles = css`
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
      color: black;
    }
    .container {
      background-color: orange;
      padding: 16px;
      border-radius: 8px;
      vertical-align: top;
      height: auto;
      width: 400px;
    }
    .container:hover {
      background-color: blue;
      color: white;
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

  constructor() {
    super();
    this.characterName = "Pikachu";
    this.characterBio =
      "Pikachu, the Mouse Pokémon. It can generate electric attacks from " +
      " the electric pouches located in both of its cheeks.";
    this.topText = "When you forgot to do the weekly assignments";
    this.bottomText = "So you have to do it in the last minute";
    this.opened = false;
    this.characterImage =
      "https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg";
  }

  toggleEvent(e) {
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
            <h5>${this.subtitle}</h5>
          </div>
          <!-- meme maker -->
          <meme-maker
            image-url="${this.characterImage}"
            top-text="${this.topText}"
            bottom-text="${this.bottomText}"
          ></meme-maker>
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
        </div>
      </div>
    `;
  }
}

customElements.define("character-card", CharacterCard);