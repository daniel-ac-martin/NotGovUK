import { withControl } from '@not-govuk/forms';
import { SubmitButton as RawSubmit } from '../';

export const Submit: typeof RawSubmit = withControl(RawSubmit);
