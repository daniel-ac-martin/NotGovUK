import { createElement as h } from 'react';
import { render, screen, userEvent } from '@react-foundry/component-test-helpers';
import Form, { FormProps } from '../src/Form';

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

  describe('when given a date field', () => {
    const renderForm = () => render(h(Form, minimalProps,
      h(Form.Page, {},
        h(Form.DateInput, { name: 'dob', label: 'Date of birth' }),
        h(Form.Submit, {}, 'Continue')
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
        await userEvent.type(screen.getByLabelText('Month'), '11');
        await userEvent.type(screen.getByLabelText('Year'), '2007');
        await submit();
      });

      it('asks for the part that is missing', async () => expect(screen.getByRole('group')).toHaveTextContent('Enter a day'));
      it('does not ask for the parts that are present', async () => expect(screen.getByRole('group')).not.toHaveTextContent('Enter a month'));
    });
  });
});
