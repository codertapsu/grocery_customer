import NextImage from 'next/image';

import { useCart } from '@contexts/cart';
import { useToast } from '@contexts/toast';
import { useWishlist } from '@contexts/wishlist';
import { Product } from '@models/product.model';

const placeholderImg = '/assets/imgs/thumbnail.jpg';

export const WishlistTable = () => {
  const { products, remove, reset } = useWishlist();
  const toast = useToast();
  const { addProduct } = useCart();

  const addToCart = (product: Product) => {
    addProduct({
      product,
      quantity: 1,
    });
    toast.success('Product added to Cart !');
  };

  return (
    <div className='table-responsive shopping-summery'>
      <table className='table-wishlist table'>
        <thead>
          <tr className='main-heading'>
            <th className='custome-checkbox start pl-30' colSpan={2}>
              Product
            </th>
            <th scope='col'>Price</th>
            <th scope='col'>Stock Status</th>
            <th scope='col'>Action</th>
            <th scope='col' className='end'>
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className='pt-30' key={product.id}>
              <td className='image product-thumbnail pt-40'>
                <NextImage
                  width='0'
                  height='0'
                  sizes='100vw'
                  style={{ width: 'auto', height: '100%' }}
                  className='img-fluid'
                  src={(product.medias?.length && product.medias[1]?.path) || placeholderImg}
                  alt=''
                />
              </td>

              <td className='product-des product-name'>
                <h6 className='product-name  mb-10'>
                  <a>{product.name}</a>
                </h6>
                <div className='product-rate-cover'>
                  <div className='product-rate d-inline-block'>
                    <div
                      className='product-rating'
                      style={{
                        width: '90%',
                      }}
                    ></div>
                  </div>
                  <span className='font-small text-muted ml-5'> (4.0)</span>
                </div>
              </td>
              <td className='price' data-title='Price'>
                <h3 className='text-brand'>${product.promotionalPrice}</h3>
              </td>
              <td className='detail-info text-center' data-title='Stock'>
                {product.stock === 0 ? (
                  <span className='stock-status out-stock mb-0'>Out of stock</span>
                ) : (
                  <span className='stock-status in-stock mb-0'>In Stock</span>
                )}
              </td>
              <td className='text-right' data-title='Cart'>
                {product.stock === 0 ? (
                  <button className='btn btn-sm btn-secondary'>Contact Us</button>
                ) : (
                  <button className='btn btn-sm' onClick={() => addToCart(product)}>
                    Add to cart
                  </button>
                )}
              </td>
              <td className='action' data-title='Remove'>
                <button className='btn btn-sm btn-danger' onClick={() => remove(product)}>
                  <i className='fi-rs-trash'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='text-right'>
        <button className='btn btn-sm btn-danger' onClick={reset}>
          Clear All
        </button>
      </div>
    </div>
  );
};
