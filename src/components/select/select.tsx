// import Select2 from 'react-select2-wrapper';

import type { Item } from './models/options.model';

interface Props<T> {
  items?: Item<T>[];
  value?: Item<T>['id'];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: (value: Item<T>['id']) => void;
}

export function Select<T = number>({ placeholder, disabled, multiple, items, value, onChange }: Props<T>) {
  return (
    <>
    <select>
      <option value="1">1</option>
    </select>
    </>
    // <Select2
    //   className='form-control select-active'
    //   multiple={!!multiple}
    //   options={{
    //     disabled,
    //     placeholder: placeholder || 'Select an option...',
    //   }}
    //   value={value}
    //   data={items || []}
    //   onChange={(e) => {
    //     if (onChange) {
    //       onChange((e.target as HTMLSelectElement).value as T);
    //     }
    //   }}
    // />
  );
}
