import { useState } from 'react';

import { useReduxStore } from '@contexts/redux-store';

export const CategoryFilter = () => {
  const { updateProductCategory } = useReduxStore();
  const [active, setActive] = useState(0);

  const selectCategory = (i, category) => {
    // e.preventDefault();
    updateProductCategory(category);
    // router.push('/')
    setActive(active == i ? 0 : i);
  };

  const categories = [
    { title: '' },
    { title: 'jeans' },
    { title: 'shoe' },
    { title: 'jacket' },
    { title: 'trousers' },
    { title: 'accessories' },
  ];

  return (
    <>
      <ul className='categor-list'>
        {categories.map((item, i) => (
          <li key={i} onClick={() => selectCategory(i, item.title)}>
            <a className={active == i ? 'cat-item text-danger' : 'cat-item text-muted'}>
              {i == 0 ? 'All' : `${item.title}`}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

