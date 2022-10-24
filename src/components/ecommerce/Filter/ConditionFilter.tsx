import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useReduxStore } from '@contexts/redux-store';

import { CheckBox } from './Checkbox';

export const ContitionFilter = () => {
  const { updateProductFilters } = useReduxStore();
  const [sizes, setSizeCheckbox] = useState([{ value: 'new' }, { value: 'refurbished ' }, { value: 'used' }]);
  const router = useRouter();
  const searchTerm = router.query.search as string;

  const [selectedSizes, setSizes] = useState([]);

  useEffect(() => {
    const filters = {
      condition: selectedSizes,
    };

    updateProductFilters(filters);
  }, [sizes, searchTerm]);

  const handleCheckBox = (event, filters, updatefilters, selectFilter, text) => {
    const value = event.target.value;
    const updateSizes = filters;

    updateSizes.forEach((item) => {
      if (item.value === value) {
        if (item.checked) {
          item.checked = false;
          const newsize = text.filter((item) => item !== value);
          selectFilter([...newsize]);
        } else {
          item.checked = true;
          const newsize = text.includes(value) ? text : [...text, value];
          selectFilter([...newsize]);
        }
      }
    });

    updatefilters([...updateSizes]);
  };

  return (
    <>
      <div className='custome-checkbox'>
        <CheckBox
          heading='Select Size'
          filters={sizes}
          handleCheckBox={(e) => {
            handleCheckBox(e, sizes, setSizeCheckbox, setSizes, selectedSizes);
          }}
        />
      </div>
    </>
  );
};
