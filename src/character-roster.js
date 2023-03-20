import { LitElement, html, css } from "lit";
import "./character-card2.js";

export class CharacterRoster extends LitElement {
  static get tag() {
    return "character-roster";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .wrapper {
        border: 1px solid black;
        padding: 10px;
        display: flex;
      }
      .item {
        display: inline-flex;
      }
    `;
  }

  static get properties() {
    return {
      characters: { type: Array },
      team: { type: String },
    };
  }

  constructor() {
    super();
    this.characters = [];
    this.team = "Team Ash Ketchum";
    this.updateRoster();
  }

  updateRoster() {
    const address = new URL("../api/roster.js", import.meta.url).href;
    fetch(address).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return [];
    })
    .then((data) => {
        this.characters = data;
    });
  }

  render() {
    return html`
      <h2>${this.team}</h2>
      <div class="wrapper">
        ${this.characters.map(
          (character) => html`
            <div class="item">
              <character-card2
                title="${character.title}"
                subtitle="${character.subtitle}"
                bio="${character.bio}"
                characterImage="${character.characterImage}"
                bottomText="${character.bottomText}"
                topText="${character.topText}"
              ></character-card2>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define("character-roster", CharacterRoster);
