import { SingleProduct } from '../ecommerce/SingleProduct';

export const FeaturedTab = ({ products }) => {
  const showItem = 10;

  return (
    <>
      {products.slice(0, showItem).map((product, i) => (
        <div
          key={i}
          data-wow-delay={`${100 * (i + 1)}ms`}
          className='col-lg-1-5 col-md-4 col-12 col-sm-6 wow animate__animated animate__fadeInUp'
        >
          <SingleProduct product={product} />
        </div>
      ))}
    </>
  );
};
