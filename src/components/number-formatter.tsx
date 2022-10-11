import { useSettings } from '@contexts/settings';
import { useEffect, useState } from 'react';

interface Props {
  style?: 'decimal' | 'currency' | 'percent';
  value: number;
}
export const NumberFormatter = ({ style = 'decimal', value }: Props) => {
  const { localeId, currencyCode } = useSettings();
  const [formattedValue, setFormattedValue] = useState<string>('');

  useEffect(() => {
    setFormattedValue(
      new Intl.NumberFormat(localeId, {
        style,
        currency: currencyCode,
      }).format(value),
    );
  }, [style, value, localeId, currencyCode]);

  return <span>{formattedValue}</span>;
};
