import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button, StartButton, SubmitButton } from '../src';

export default {
  title: 'Button',
  component: Button
};

export const standard = () => (<Button value="Save as draft" onClick={action('clicked')} />);
export const submit = () => (<SubmitButton value="Save and continue" />);
export const secondary = () => (<SubmitButton value="Save as draft" secondary="secondary" />);
export const warning = () => (<SubmitButton value="Delete" warning="warning" />);
export const disabled = () => (<Button value="Delete" disabled="disabled" onClick={action('clicked')} />);
export const disabledSubmit = () => (<SubmitButton value="Delete" disabled="disabled" />);
export const disabledWarning = () => (<SubmitButton value="Delete" warning="warning" disabled="disabled" />);
export const link = () => (<Button href="#" value="Continue" />);
export const start = () => (<StartButton href="#" />);
