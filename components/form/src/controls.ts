import type { ComponentProps, ComponentType } from 'react';
import type { ControlProps } from '@not-govuk/forms';

import { withControl } from '@not-govuk/forms';
import { SubmitButton as _Submit } from '@not-govuk/button';

type _SubmitProps = ComponentProps<typeof _Submit>;

export const Submit: ComponentType<_SubmitProps & ControlProps> = withControl(_Submit);
