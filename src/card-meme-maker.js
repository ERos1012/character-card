import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

class cardMemeMaker extends LitElement {
  static properties = {
      meme: {
        type: String
      },
      topText: {
        type: String
      }
  };    

  constructor() {
    super();
    this.meme = "https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg";
    this.topText = "When you forgot to do the weekly assignments";
  }


  render() {
    return html`
    <div class="character-card">
      <meme-maker
          alt="suprised pikachu"
          image-url="${this.meme}"
          top-text="${this.topText}"
        ></meme-maker>
      </div>
    `;
  }

}
customElements.define('card-meme-maker', cardMemeMaker);