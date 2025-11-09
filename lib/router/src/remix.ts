import type { UseIsActive } from './is-active';
import type { UseLocation } from './location';

import { useLocation as _useLocation } from '@remix-run/react';
import { makeUseIsActive } from './is-active';
import { makeUseLocation } from './location';

export const needSuspense = false;

export const useLocation: UseLocation = makeUseLocation(_useLocation);
export const useIsActive: UseIsActive = makeUseIsActive(useLocation);

export {
  Link,
  useNavigate,
  useParams
} from '@remix-run/react';
export type { LinkProps } from './dummy';
