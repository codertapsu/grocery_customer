import React from 'react';
import Select2 from 'react-select2-wrapper';

import type { Item } from './models/options.model';

interface Props<T> {
  items?: Item<T>[];
  value?: Item<T>['id'];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: (value: Item<T>['id']) => void;
}

function formatCountry(country) {
  // return country.text + '111';
  // if (!country.id) {
  //   return country.text;
  // }
  // return $country;
  return React.createElement(
    'span',
    null,
    '<span class="flag-icon flag-icon-' +
      ' flag-icon-squared"></span>' +
      '<span class="flag-text">' +
      country.text +
      '</span>',
  );
}

export function Select<T = number>({ placeholder, disabled, multiple, items, value, onChange }: Props<T>) {
  return (
    <Select2
      className='form-control select-active'
      multiple={!!multiple}
      options={{
        disabled,
        placeholder: placeholder || 'Select an option...',
        // templateResult: formatCountry,
      }}
      value={value}
      data={items || []}
      onChange={(e) => {
        if (onChange) {
          onChange((e.target as HTMLSelectElement).value as T);
        }
      }}
    />
  );
}
