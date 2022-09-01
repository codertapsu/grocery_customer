import classNames, { Argument } from 'classnames';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export const mergeClassNames = (...classes: Argument[]) => twMerge(classNames(...classes));
