import type { LinkProps } from '@not-govuk/link';

export type EnhancedLinkProps = LinkProps & {
  /** The optional label that goes underneath the link to the page, providing further context for the user about where the link goes. */
  labelText?: string
};
