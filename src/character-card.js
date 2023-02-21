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

  render() {
    return html`
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h4>${this.characterName}</h4>
          </div>
          <img class="image" src="${characterImage}" />
          <details class="details">
          <slot name="bio"></slot>
            <p>${this.characterBio}</p>
            </details>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("character-card", CharacterCard);
