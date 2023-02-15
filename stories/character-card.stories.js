import { html } from 'lit';
import '../src/character-card.js';

export default {
  title: 'CharacterCard',
  component: 'character-card',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <character-card
      style="--character-card-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </character-card>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
