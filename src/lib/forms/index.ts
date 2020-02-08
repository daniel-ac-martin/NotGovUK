import WTForm, { Page } from './lib';
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

const Form: any = WTForm;

Form.Checkboxes = Checkboxes;
Form.DateInput = DateInput;
Form.Field = Field;
Form.Radios = Radios;
Form.Select = Select;
Form.Submit = Submit;
Form.TextInput = TextInput;
Form.Textarea = Textarea;

Form.Page = Page;

export { Form };
