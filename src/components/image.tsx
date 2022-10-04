import { forwardRef, useState } from 'react';
import NextImage from 'next/image';

type ImgElementStyle = NonNullable<JSX.IntrinsicElements['img']['style']>;

interface Props {
  src: string;
  alt?: string;
  className?: string;
  title?: string;
  responsive?: boolean;
  objectFit?: ImgElementStyle['objectFit'];
  objectPosition?: ImgElementStyle['objectPosition'];
}

interface Dimension {
  width: number;
  height: number;
}

const Image = ({ src, alt, title, className, responsive = true, objectFit = 'contain' }: Props) => {
  const [dimension, setDimension] = useState<Dimension>({ width: null, height: null });
  return (
    <>
      <NextImage
        width={dimension?.width || '100%'}
        height={dimension?.height || '100%'}
        loading='lazy'
        layout={responsive ? 'responsive' : 'intrinsic'}
        objectFit={objectFit}
        src={src}
        alt={alt}
        title={title}
        className={className}
        onLoadingComplete={(imageDimension) => {
          if (dimension.height !== imageDimension.naturalHeight || dimension.width !== imageDimension.naturalWidth) {
            setDimension({
              width: imageDimension.naturalWidth,
              height: imageDimension.naturalHeight,
            });
          }
        }}
      />
    </>
  );
};

export { Image };
