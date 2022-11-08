import Link from 'next/link';

import { Image } from '@components/image';

interface Props {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  linkText: string;
}

export const BannerCategory = ({ id, image, title, subtitle, linkText }: Props) => {
  return (
    <div className='banner banner-cat banner-badge'>
      <Link href={{ pathname: `/categories/${id}` }}>
        <Image src={image} alt='Banner category' />
      </Link>
      <Link href={{ pathname: `/categories/${id}` }} className='banner-link'>
        <h3 className='banner-title'>{title}</h3>
        <h4 className='banner-subtitle'>{subtitle}</h4>
        <span className='banner-link-text'>{linkText}</span>
      </Link>
    </div>
  );
};
