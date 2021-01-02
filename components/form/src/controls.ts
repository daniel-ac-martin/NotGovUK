import { withControl } from '@not-govuk/forms';
import { SubmitButton as RawSubmit } from '@not-govuk/components';

export const Submit: typeof RawSubmit = withControl(RawSubmit);
