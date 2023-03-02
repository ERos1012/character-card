import { LitElement, html, css } from "lit";

class characterCardTaskBar extends LitElement {
  static properties = {
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
  };

  static get styles() {
    return css`
      button:hover {
        background-color: pink;
        color: red;
      }

      button:focus {
        background-color: green;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="character-card-taskbar">
        <button @click="${this._addCard}" class="duplicate">
          Duplicate card
        </button>
        <button @click="${this._toggleTitle}" class="modifytitle">
          Change Name
        </button>
        <button @click="${this._deleteCard}" id="deletelastcard">
          Delete Card
        </button>
        <button
          @opened-changed="${this._toggleBio}"
          @click="${this._showBio}"
          class="toggleBtn"
        >
          Show Bio
        </button>
        <button @click="${this._changeBackground}" class="colorchange">
          Change Color
        </button>
      </div>
      <slot></slot>
    `;
  }

  //adds card
  _addCard(e) {
    const itemToClone = this.querySelector("character-card").cloneNode(true);
    this.appendChild(itemToClone);
  }

  //changes background
  _changeBackground(e) {
    const colors = ["red", "orange", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    this.querySelector("character-card").accentColor = randomColor;
  }

  //toggles title
  _toggleTitle(e) {
    let characterName = prompt("Name of character:");
    if (characterName) {
      this.children[0].characterName = characterName;
    }
  }

  //deletes card
  _deleteCard(e) {
    if (this.children.length > 1) {
      this.removeChild(this.lastElementChild);
    } else {
      alert("YOU CAN NOT DELETE!!!!");
    }
  }

  //shows bio
  _showBio(e) {
    const card = this.querySelector("character-card");
    card.opened = !card.opened;
  }

  //custom event
  _toggleBio(e) {
    if (e.target === document.querySelector("character-card")) {
      console.log(e.detail.value);
      document.querySelector(".toggleBtn").innerText = e.detail.value
        ? "Hide"
        : "Show";
    }
  }
}

customElements.define("character-card-taskbar", characterCardTaskBar);
