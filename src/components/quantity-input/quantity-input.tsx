import { useLongPress } from '@hooks/use-long-press';
import { useCallback, useEffect, useRef } from 'react';

interface Props {
  value?: number;
  setValue?: (newValue: number) => void;
  max?: number;
  min?: number;
  step?: number;
}

export const QuantityInput = ({ value, setValue, min = 0, max = Number.MAX_SAFE_INTEGER, step = 1 }: Props) => {
  const decrementRef = useRef<HTMLButtonElement>();
  const incrementRef = useRef<HTMLButtonElement>();

  // useLongPress(decrementRef, () => {
  //   if (setValue) {
  //     setValue(Math.max(value - step, 0));
  //   }
  // });

  // useLongPress(incrementRef, () => {
  //   console.log('incrementRef');

  //   if (setValue) {
  //     setValue(Math.min(value + step, max));
  //   }
  // });

  // useEffect(() => {
  //   console.log(value);

  // }, [value]);

  return (
    <div className='input-group input-spinner'>
      <div className='input-group-prepend'>
        <button
          ref={decrementRef}
          style={{ minWidth: '26px' }}
          className='btn btn-decrement btn-spinner'
          type='button'
          onClick={() => {
            if (setValue) {
              setValue(Math.max(value - step, 0));
            }
          }}
        >
          <i className='icon-minus' />
        </button>
      </div>
      <input
        type='text'
        style={{ textAlign: 'center' }}
        className='form-control '
        placeholder=''
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          // console.log(Number(e.target.value || 0));

          setValue(Number(e.target.value || 0));
        }}
      />
      <div className='input-group-append'>
        <button
          ref={incrementRef}
          style={{ minWidth: '26px' }}
          className='btn btn-increment btn-spinner'
          type='button'
          onClick={() => {
            if (setValue) {
              setValue(Math.min(value + step, max));
            }
          }}
        >
          <i className='icon-plus' />
        </button>
      </div>
    </div>
  );
};
