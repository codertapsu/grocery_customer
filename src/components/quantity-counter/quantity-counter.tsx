import { FC, useState } from 'react';

interface Props {
  min?: number;
  max?: number;
  quantity?: number;
  increase?: (value: number) => void;
  decrease?: (value: number) => void;
}

export const QuantityCounter: FC<Props> = ({
  min = 1,
  max = Number.MAX_SAFE_INTEGER,
  quantity = 1,
  increase,
  decrease,
}) => {
  const [qty, setQty] = useState(quantity);

  return (
    // <div className='detail-qty radius border'>
    //   <a onClick={(e) => setQuantity(quantity > 1 ? quantity - 1 : 1)} className='qty-down'>
    //     <i className='fi-rs-angle-small-down'></i>
    //   </a>
    //   <span className='qty-val'>{quantity}</span>
    //   <a onClick={() => setQuantity(quantity + 1)} className='qty-up'>
    //     <i className='fi-rs-angle-small-up'></i>
    //   </a>
    // </div>
    <div className='detail-qty radius border'>
      <button type='button' className='qty-down' onClick={(e) => setQty(Math.max(qty - 1, min))}>
        <i className='fi-rs-angle-small-down' />
      </button>
      <input
        type='number'
        name='quantity'
        step={1}
        className='qty-val'
        value={qty}
        min={min}
        max={max}
        onChange={(e) => setQty(Math.min(max, Math.min(Number(e.target.value || 0), min)))}
      />
      <button type='button' className='qty-up' onClick={() => setQty(Math.min(qty + 1, max))}>
        <i className='fi-rs-angle-small-up' />
      </button>
    </div>
  );
};
