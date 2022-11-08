import Link from 'next/link';

import { mergeClassNames } from '@helpers/merge-class-names.helper';

interface Props {
  items: {
    href: string;
    name: string;
  }[];
  className?: string;
  children?: React.ReactNode;
}

const Breadcrumb = ({ items, className, children }: Props) => {
  const length = items.length;

  return (
    <nav aria-label='breadcrumb' className={mergeClassNames('breadcrumb-nav', className)}>
      <div className='container'>
        {children}
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link href='/'>Home</Link>
          </li>
          {(items || []).map((item, index) => {
            if (index === length - 1) {
              return (
                <li key={item.href} className='breadcrumb-item active' aria-current='page'>
                  {item.name}
                </li>
              );
            }
            return (
              <li key={item.href} className='breadcrumb-item'>
                <Link href={item.href}>{item.name}</Link>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export { Breadcrumb };
