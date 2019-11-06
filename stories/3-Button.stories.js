import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button, StartButton, SubmitButton } from '../src';

export default {
  title: 'Button',
  parameters: {
    componentSubtitle: 'Buttons for both forms and navigation'
  },
  component: Button
};

export const standard = () => (<Button value="Save as draft" onClick={action('clicked')} />);
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
