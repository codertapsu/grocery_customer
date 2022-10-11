import { forwardRef, useEffect, useState } from 'react';
import NextImage from 'next/image';

type ImgElementStyle = NonNullable<JSX.IntrinsicElements['img']['style']>;
type VoidFunction = () => void;

interface Props {
  priority?: boolean;
  loading?: 'lazy' | 'eager';
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

const defer = (callback: VoidFunction) => {
  // Check if we can use requestIdleCallback
  if (window.requestIdleCallback) {
    const handle = window.requestIdleCallback(callback);
    return () => window.cancelIdleCallback(handle);
  }
  // Just defer using setTimeout with some random delay otherwise
  const handle = setTimeout(callback, 2345 + Math.random() * 1000);
  return () => clearTimeout(handle);
};

const isMobileConnection = () => {
  const connection =
    (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  return (
    connection?.type === 'cellular' ||
    connection?.effectiveType === 'slow-2g' ||
    connection?.effectiveType === '2g' ||
    connection?.effectiveType === '3g' ||
    connection?.saveData === true
  );
};

const Image = ({
  src,
  alt,
  title,
  className,
  responsive = true,
  objectFit = 'contain',
  priority,
  loading: initLoading,
}: Props) => {
  const [dimension, setDimension] = useState<Dimension>({ width: null, height: null });
  const [loading, setLoading] = useState(initLoading);

  useEffect(() => {
    // Skip if image is already eager or has priority (disables lazy loading)
    if (initLoading === 'eager' || priority) {
      return;
    }

    if (!isMobileConnection()) {
      let clearDefer: VoidFunction;
      // Set loading to eager if all resources of document are loaded, but defer it a bit
      const onLoad = () => {
        clearDefer = defer(() => setLoading('eager'));
      };
      window.addEventListener('load', onLoad);
      return () => {
        // Clean up the load event listener and an eventual defer
        window.removeEventListener('load', onLoad);
        if (clearDefer) {
          clearDefer();
        }
      };
    }
  }, [initLoading, priority]);

  return (
    <>
      <NextImage
        width={dimension?.width || '100%'}
        height={dimension?.height || '100%'}
        loading={loading}
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
