import type { ComponentProps, ComponentType } from 'react';
import type { ControlProps } from '@react-foundry/forms';

import { withControl } from '@react-foundry/forms';
import { SubmitButton as _Submit } from '@not-govuk/button';

type _SubmitProps = ComponentProps<typeof _Submit>;

export const Submit: ComponentType<_SubmitProps & ControlProps> = withControl(_Submit);
