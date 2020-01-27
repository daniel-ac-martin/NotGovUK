import { createElement as h } from 'react';
import { useHistory } from 'react-router-dom';
import { urlParse, useLocation } from '../request';
import FormikForm from './formik-form';
import {
  Checkboxes,
  DateInput,
  Field,
  Radios,
  Select,
  Submit,
  TextInput,
  Textarea
} from './controls';

const Form = props => {
  const history = useHistory();
  const location = useLocation();
  const submittedValues = props.method === 'get' ? location.query : location.state;
  const initialErrors = (submittedValues && Object.keys(submittedValues).length && props.validate(submittedValues)) || undefined;
  const initialValues = { ...props.initialValues, ...submittedValues };

  const onSubmit = (values, actions) => {
    const url = urlParse(props.action);
    const state = props.method === 'post' ? values : undefined

    if (props.method === 'get') {
      url.query = {...url.query, ...values};
    }

    actions.setSubmitting(false);
    history.push(url.toString(), state);
  };

  return h(FormikForm, {
    action: location.pathname,
    children: props.children,
    id: props.id,
    initialErrors: initialErrors,
    initialTouched: initialErrors,
    initialValues: initialValues,
    method: props.method,
    onSubmit: onSubmit,
    validate: props.validate
  });
};

Form.Checkboxes = Checkboxes;
Form.DateInput = DateInput;
Form.Field = Field;
Form.Radios = Radios;
Form.Select = Select;
Form.Submit = Submit;
Form.TextInput = TextInput;
Form.Textarea = Textarea;

export { Form };
