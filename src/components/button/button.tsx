// import { ImSpinner2 } from 'react-icons/im';

import { forwardRef } from 'react';

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

type ButtonProps = {
  cornerType?: keyof typeof ButtonCornerType;
  fillType?: keyof typeof ButtonFillType;
  themeType?: keyof typeof ButtonThemeType;
} & React.ComponentPropsWithRef<'button'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, cornerType = 'square', fillType, themeType = 'primary', ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
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
      </button>
    );
  },
);

export { Button };
