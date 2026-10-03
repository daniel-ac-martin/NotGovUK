import type { FC } from 'react';

import { Fragment, createElement as h } from 'react';
import { render, screen, userEvent } from '@react-foundry/component-test-helpers';
import { useLocation } from '@react-foundry/router';
import Form, { FormProps } from '../src/Form';

const Submitted: FC<{}> = () => h('data', { 'aria-label': 'submitted' }, useLocation().search);

describe('Form', () => {
  const minimalProps: FormProps = {
    action: '.',
    method: 'get'
  };

  describe('when given valid props', () => {
    beforeEach(async () => {
      render(h(Form, minimalProps, 'Child'));
    });

    it('renders an element', async () => expect(screen.getByRole('generic')).toBeInTheDocument());
    it('with the children provided', async () => expect(screen.getByRole('generic')).toHaveTextContent('Child'));
  });

  describe('when given an optional date field', () => {
    const renderForm = (props: object = {}) => render(h(Fragment, {},
      h(Submitted),
      h(Form, minimalProps,
        h(Form.Page, {},
          h(Form.DateInput, { name: 'dob', label: 'Date of birth', ...props }),
          h(Form.Submit, {}, 'Continue')
        )
      )
    ));
    const submit = () => userEvent.click(screen.getByRole('button'));

    describe('and the date is left empty', () => {
      beforeEach(async () => {
        renderForm();
        await submit();
      });

      it('submits without asking for any of the parts', async () => expect(screen.queryByRole('group')).not.toBeInTheDocument());
    });

    describe('and only some of the parts are entered', () => {
      beforeEach(async () => {
        renderForm();
        await userEvent.type(screen.getByLabelText('Day'), '12');
        await userEvent.type(screen.getByLabelText('Year'), '2007');
        await submit();
      });

      it('asks for the part that is missing', async () => expect(screen.getByRole('group')).toHaveTextContent('Enter a month'));
      it('does not ask for the parts that are present', async () => expect(screen.getByRole('group')).not.toHaveTextContent('Enter a day'));
    });

    describe('and a part has been removed', () => {
      beforeEach(async () => {
        renderForm({ year: false });
        await userEvent.type(screen.getByLabelText('Day'), '31');
        await userEvent.type(screen.getByLabelText('Month'), '3');
        await submit();
      });

      it('submits the parts that are left', async () => expect(screen.getByLabelText('submitted')).toHaveTextContent('dob=--03-31'));
    });

    describe('and only the day is left', () => {
      beforeEach(async () => {
        renderForm({ month: false, year: false });
        await userEvent.type(screen.getByLabelText('Day'), '31');
        await submit();
      });

      it('submits the day on its own', async () => expect(screen.getByLabelText('submitted')).toHaveTextContent('dob=---31'));
    });
  });
});
