import { useCart } from '@contexts/cart';
import { Product as ProductModel } from '@models/product.model';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export default function Product() {
  const { addProduct } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState<ProductModel>();
  const { id } = router.query;

  const addToCart = useCallback(() => {
    addProduct({
      product,
      quantity: 1,
    });
  }, [product]);

  const buyProduct = () => {
    //
  };

  useEffect(() => {
    //
  }, []);

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <article className='group relative'>
      <button
        onClick={buyProduct}
        className='group relative mt-6 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white outline-none hover:bg-indigo-700 focus:outline-none'
      >
        Kup
      </button>
      <button
        onClick={addToCart}
        className='group relative mt-4 flex w-full justify-center rounded-md border border-transparent bg-gray-100 py-2 px-4 text-sm font-medium text-black outline-none hover:bg-gray-300 focus:outline-none'
      >
        Dodaj do koszyka
      </button>
    </article>
  );
}
