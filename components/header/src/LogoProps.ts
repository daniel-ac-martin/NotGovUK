import { SVGProps } from 'react';

export type LogoProps = SVGProps<SVGSVGElement> & {
  fallback?: SVGProps<SVGImageElement>
};
