import { useEffect, useState } from 'react';

import { Deals1 } from '../elements/Deals1';

export const FeatchDeals = () => {
  const [deals, setDeals] = useState([]);

  const dealsProduct = async () => {
    const request = await fetch(`/static/product.json`);
    const allProducts = await request.json();
    // Discount
    const discountProduct = allProducts.filter((item) => item.discount.isActive);

    setDeals(discountProduct);
  };

  useEffect(() => {
    dealsProduct();
  }, []);

  return (
    <>
      <div className='row'>
        {deals.slice(0, 4).map((product, i) => (
          <div className='col-xl-3 col-lg-4 col-md-6' key={i}>
            <Deals1 product={product} />
          </div>
        ))}
      </div>
    </>
  );
};
