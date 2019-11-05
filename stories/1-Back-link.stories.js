import React from 'react';
import '../style.css';
import { inMiddle } from './helpers';
import { BackLink } from '../src';

export default {
  title: 'Back link'
};

export const text = inMiddle(<BackLink href="" />);
