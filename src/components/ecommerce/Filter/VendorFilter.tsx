import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import { StoreState, useReduxStore } from '@contexts/redux-store';
import { CheckBox } from './Checkbox';

export const VendorFilter = () => {
  const products = useSelector<StoreState, any>((state) => state.products.items);
  const { updateProductFilters } = useReduxStore();
  const [sizes, setSizeCheckbox] = useState([
    { value: 'NestFood' },
    { value: 'stouffer' },
    { value: 'starKist' },
    { value: 'aldi' },
    { value: 'adidas' },
    { value: 'Costco' },
    { value: 'Harris' },
    { value: 'iSnack' },
    { value: 'Burbe' },
  ]);

  const Router = useRouter();
  const searchTerm = Router.query.search;

  const [selectedVendor, setVendor] = useState([]);

  useEffect(() => {
    const filters = {
      vendor: selectedVendor,
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
            handleCheckBox(e, sizes, setSizeCheckbox, setVendor, selectedVendor);
          }}
        />
      </div>
    </>
  );
};
