import React from 'react';
import { action } from '@storybook/addon-actions';
import { inMiddle } from './helpers';
import { Button, StartButton, SubmitButton } from '../src';

export default {
  title: 'Button'
};

export const standard = inMiddle(<Button value="Save as draft" onClick={action('clicked')} />);
export const submit = inMiddle(<SubmitButton value="Save and continue" />);
export const secondary = inMiddle(<SubmitButton value="Save as draft" secondary="secondary" />);
export const warning = inMiddle(<SubmitButton value="Delete" warning="warning" />);
export const disabled = inMiddle(<Button value="Delete" disabled="disabled" onClick={action('clicked')} />);
export const disabledSubmit = inMiddle(<SubmitButton value="Delete" disabled="disabled" />);
export const disabledWarning = inMiddle(<SubmitButton value="Delete" warning="warning" disabled="disabled" />);
export const link = inMiddle(<Button href="#" value="Continue" />);
export const start = inMiddle(<StartButton href="#" />);
