import { forwardRef } from 'react';

import Link from 'next/link';
import { UrlObject } from 'url';

import { mergeClassNames } from '@helpers/merge-class-names.helper';

import styles from './styles.module.scss';

export enum ButtonCornerType {
  'rounded',
  'square',
  'pill',
}

export enum ButtonFillType {
  'filled',
  'outline',
  'link',
}

export enum ButtonThemeType {
  'primary',
  'dark',
}

type Url = string | UrlObject;

type ButtonProps = {
  cornerType?: keyof typeof ButtonCornerType;
  fillType?: keyof typeof ButtonFillType;
  themeType?: keyof typeof ButtonThemeType;
  href: Url;
} & React.ComponentPropsWithRef<'a'>;

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ children, className, href, cornerType = 'square', fillType = 'filled', themeType = 'primary', ...rest }, ref) => {
    return (
      <Link
        href={href}
        ref={ref}
        className={mergeClassNames(
          styles['btn'],
          cornerType ? styles[`btn-${cornerType}`] : '',
          fillType ? styles[`btn-${fillType}`] : '',
          themeType ? styles[`btn-${themeType}`] : '',
          className,
        )}
        {...rest}
      >
        {children}
      </Link>
    );
  },
);

export { ButtonLink };
