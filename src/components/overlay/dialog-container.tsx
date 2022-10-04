import { mergeClassNames } from '@helpers/merge-class-names.helper';
import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  close: () => void;
}

const DialogContainer = ({ children, close }: Props) => {
  const ref = useRef<HTMLDivElement>();

  return (
    <div role='document' ref={ref} className={mergeClassNames(styles['dialog-container'])}>
      <button
        title='Close (Esc)'
        type='button'
        className={mergeClassNames(styles['close-btn'])}
        onClick={close}
      ></button>
      {children}
    </div>
  );
};

export { DialogContainer };
