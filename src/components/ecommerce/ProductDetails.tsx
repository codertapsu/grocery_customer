import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { StoreState, useReduxStore } from '@contexts/redux-store';
import { Product } from '@models/product.model';

import { ProductTab } from '../elements/ProductTab';
import { RelatedSlider } from '../sliders/Related';
import { ThumbSlider } from '../sliders/Thumb';

interface Props {
  product: Product;
  quickView?: Product;
}

export const ProductDetails = ({ product, quickView }: Props) => {
  const cartItems = useSelector<StoreState, StoreState['cart']>((state) => state.cart);
  const [quantity, setQuantity] = useState(1);

  const { addToCompare, addToWishlist, addToCart, increaseQuantity, decreaseQuantity } = useReduxStore();

  const dispatch = useDispatch();

  const handleCart = (product) => {
    addToCart(product);
    toast('Product added to Cart !');
  };

  const handleCompare = (product) => {
    addToCompare(product);
    toast('Added to Compare list !');
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
    toast('Added to Wishlist !');
  };

  const inCart = cartItems.find((cartItem) => cartItem.id === product.id);

  return (
    <>
      <div className='product-detail accordion-detail'>
        <div className='row'>
          <div className='col-md-12 col-lg-6 mb-md-0 mb-sm-5'>
            <div className='detail-gallery'>
              {/* <span className='zoom-icon'>
              <i className='fi-rs-search'></i>
            </span> */}
              <div className='product-image-slider'>
                <ThumbSlider product={product} />
              </div>
            </div>
          </div>
          <div className='col-md-12 col-lg-6'>
            <div className='detail-info  pr-30 pl-30'>
              <span className='stock-status out-stock'> Sale Off </span>
              <h2 className='title-detail'>{product.name}</h2>
              <div className='product-detail-rating'>
                <div className='product-rate-cover text-end'>
                  <div className='product-rate d-inline-block'>
                    <div className='product-rating' style={{ width: '90%' }}></div>
                  </div>
                  <span className='font-small text-muted ml-5'> (32 reviews)</span>
                </div>
              </div>
              <div className='clearfix product-price-cover'>
                <div className='product-price primary-color float-left'>
                  <span className='current-price  text-brand'>${product.promotionalPrice}</span>
                  <span>
                    <span className='save-price font-md color3 ml-15'>
                      {10}% Off
                      {/* {product.discount.percentage}% Off */}
                    </span>
                    <span className='old-price font-md ml-15'>
                      {product.regularPrice ? `$ ${product.regularPrice}` : null}
                    </span>
                  </span>
                </div>
              </div>

              <div className='short-desc mb-30'>
                <p className='font-lg'>{product.description}</p>
              </div>
              {/* <div className='attr-detail attr-color mb-15'>
                <strong className='mr-10'>Color</strong>
                <ul className='list-filter color-filter'>
                  {product.variations.map((clr, i) => (
                    <li key={i}>
                      <a href='#'>
                        <span className={`product-color-${clr}`}></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div> */}
              <div className='attr-detail attr-size'>
                <strong className='mr-10'>Size</strong>
                <ul className='list-filter size-filter font-small'>
                  <li className='active'>
                    <a>M</a>
                  </li>
                  <li>
                    <a>L</a>
                  </li>
                  <li>
                    <a>XL</a>
                  </li>
                  <li>
                    <a>XXL</a>
                  </li>
                </ul>
              </div>
              <div className='bt-1 border-color-1 mt-30 mb-30'></div>
              <div className='detail-extralink'>
                <div className='detail-qty radius border'>
                  <a
                    onClick={(e) =>
                      !inCart ? setQuantity(quantity > 1 ? quantity - 1 : 1) : decreaseQuantity(product?.id)
                    }
                    className='qty-down'
                  >
                    <i className='fi-rs-angle-small-down'></i>
                  </a>
                  <span className='qty-val'>{inCart?.quantity || quantity}</span>
                  <a
                    onClick={() => (!inCart ? setQuantity(quantity + 1) : increaseQuantity(product.id))}
                    className='qty-up'
                  >
                    <i className='fi-rs-angle-small-up'></i>
                  </a>
                </div>
                <div className='product-extra-link2'>
                  <button
                    onClick={(e) =>
                      handleCart({
                        ...product,
                        quantity: quantity || 1,
                      })
                    }
                    className='button button-add-to-cart'
                  >
                    Add to cart
                  </button>
                  <a
                    aria-label='Add To Wishlist'
                    className='action-btn hover-up'
                    onClick={(e) => handleWishlist(product)}
                  >
                    <i className='fi-rs-heart'></i>
                  </a>
                  <a aria-label='Compare' className='action-btn hover-up' onClick={(e) => handleCompare(product)}>
                    <i className='fi-rs-shuffle'></i>
                  </a>
                </div>
              </div>
              <ul className='product-meta font-xs color-grey mt-50'>
                <li className='mb-5'>
                  SKU:
                  <a href='#'>FWM15VKT</a>
                </li>
                <li className='mb-5'>
                  Tags:
                  <a href='#' rel='tag' className='me-1'>
                    Cloth,
                  </a>
                </li>
                <li>
                  Availability:
                  <span className='in-stock text-success ml-5'>{product.stock} Items In Stock</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {quickView ? null : (
          <>
            <ProductTab />
            <div className='row mt-60'>
              <div className='col-12'>
                <h3 className='section-title style-1 mb-30'>Related products</h3>
              </div>
              <div className='col-12'>
                <div className='row related-products position-relative'>
                  <RelatedSlider />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
