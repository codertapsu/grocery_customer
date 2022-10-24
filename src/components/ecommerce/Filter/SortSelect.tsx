import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useReduxStore } from '@contexts/redux-store';

export const SortSelect = () => {
  const { updateProductFilters } = useReduxStore();
  const Router = useRouter();
  const searchTerm = Router.query.search;

  const [featured, setFeatured] = useState('');

  useEffect(() => {
    const filters = {
      featured,
    };

    updateProductFilters(filters);
  }, [searchTerm, featured]);

  const seleceOption = (e) => {
    setFeatured(e.target.value);
  };

  return (
    <>
      <div className='sort-by-product-wrap'>
        <div className='sort-by'>
          <span>
            <i className='fi-rs-apps-sort'></i>
            Sort by:
          </span>
        </div>
        <div className='sort-by-dropdown-wrap custom-select'>
          <select onChange={(e) => seleceOption(e)}>
            <option value=''>Defaults</option>
            <option value='featured'>Featured</option>
            <option value='trending'>Trending</option>
            <option value='lowToHigh'>Low To High</option>
            <option value='highToLow'>High To Low</option>
          </select>
        </div>
      </div>
    </>
  );
};

