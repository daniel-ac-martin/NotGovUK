import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from "@storybook/addon-knobs";
import { Button, StartButton, SubmitButton } from '../../';
import readMe from './README.md';
import { main } from "../../../../.storybook/decorators";

export default {
  title: 'Components/ButtonOLD',
  parameters: {
    componentSubtitle: 'Buttons for both forms and navigation',
    jest: ['button'],
    notes: readMe
  },
  component: Button,
  decorators: [main]
};

export const button = () => (
  <Button
    className={text('className', undefined)}
    disabled={boolean('disabled', false)}
    href={text('href', undefined)}
    id={text('id', undefined)}
    onClick={action('clicked')}
    secondary={boolean('secondary', false)}
    start={boolean('start', false)}
    submit={boolean('submit', false)}
    value={text('value', 'Save as draft')}
    warning={boolean('warning', false)}
  />
);
button.story = {
  parameters: {
    docs: {
      storyDescription: 'A button.'
    }
  }
};

export const standard = () => (<Button value="Save as draft" />);
standard.story = {
  parameters: {
    docs: {
      storyDescription: 'A standard button.'
    }
  }
};
export const submit = () => (<SubmitButton value="Save and continue" />);
submit.story = {
  parameters: {
    docs: {
      storyDescription: 'A primary / submit button'
    }
  }
};
export const secondary = () => (<SubmitButton value="Save as draft" secondary />);
secondary.story = {
  parameters: {
    docs: {
      storyDescription: 'A secondary button. (For standard styling on links and submit buttons.)'
    }
  }
};
export const warning = () => (<SubmitButton value="Delete" warning />);
warning.story = {
  parameters: {
    docs: {
      storyDescription: 'A button that might be dangerous to press.'
    }
  }
};
export const disabled = () => (<Button value="Delete" disabled onClick={action('clicked')} />);
disabled.story = {
  parameters: {
    docs: {
      storyDescription: 'A disabled button.'
    }
  }
};
export const disabledSubmit = () => (<SubmitButton value="Delete" disabled />);
disabledSubmit.story = {
  parameters: {
    docs: {
      storyDescription: 'A disabled submit button.'
    }
  }
};
export const disabledWarning = () => (<SubmitButton value="Delete" warning disabled />);
disabledWarning.story = {
  parameters: {
    docs: {
      storyDescription: 'A button that might be dangerous to press that has been disabled.'
    }
  }
};
export const link = () => (<Button href="#" value="Continue" />);
link.story = {
  parameters: {
    docs: {
      storyDescription: 'A hyper-link / anchor that appears as a button.'
    }
  }
};
export const start = () => (<StartButton href="#" />);
start.story = {
  parameters: {
    docs: {
      storyDescription: 'A start button, for use on introduction pages.'
    }
  }
};
