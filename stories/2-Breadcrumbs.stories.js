import React from 'react';
import '../style.css';
import { inMiddle } from './helpers';
import { Breadcrumbs } from '../src';

export default {
  title: 'Breadcrumbs'
};

export const text = inMiddle(<Breadcrumbs />);
