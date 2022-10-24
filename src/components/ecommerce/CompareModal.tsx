import { useSelector } from 'react-redux';

import { StoreState, useReduxStore } from '@contexts/redux-store';

import { CompareTable } from './CompareTable';

export const CompareModal = () => {
  const compare = useSelector<StoreState, StoreState['compare']>((state) => state.compare);
  const { closeCompareModal, clearCompare, deleteFromCompare } = useReduxStore();

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-12'>
            {compare.items.length > 0 ? (
              <>
                <CompareTable
                  data={compare.items}
                  features={['name', 'price', 'size']}
                  deleteFromCompare={deleteFromCompare}
                />
                <div className='text-right'>
                  <span className='clear-btn' onClick={clearCompare}>
                    Clear All
                  </span>
                </div>
              </>
            ) : (
              <h4>No Products</h4>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
