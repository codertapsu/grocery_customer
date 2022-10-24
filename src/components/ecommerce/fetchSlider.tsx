import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { StoreState, useReduxStore } from '@contexts/redux-store';

import { BestSellerSlider } from '../sliders/BestSeller';
import { DiscountSlider } from '../sliders/Discount';
import { FeaturedSlider } from '../sliders/Featured';
import { NewArrivalTabSlider } from '../sliders/NewArrivalTab';
import { RelatedSlider } from '../sliders/Related';
import { TrendingSlider } from '../sliders/Trending';

export const FetchSlider = () => {
  const productFilters = useSelector<StoreState, StoreState['productFilters']>((state) => state.productFilters);
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [related, setRelated] = useState([]);
  const { fetchByCategory } = useReduxStore();

  useEffect(() => {
    fetchProducts();
  }, [productFilters.category]);

  const fetchProducts = async () => {
    // With Category
    const allProducts = await fetchByCategory('/static/product.json', {
      category: productFilters.category,
    });

    // Without Category
    // const request = await fetch(`/static/product.json`);
    // const allProducts = await request.json();

    // Featured Product
    const featuredProducts = allProducts.filter((item) => item.isFeatured);

    // Trending Product
    const trendingProducts = allProducts.filter((item) => item.isTrendingProduct);

    // Best Seller
    // const bestSellerProducts = allProducts.sort(function (a, b) {
    //   return a.totalSell > b.totalSell ? -1 : 1;
    // });
    
    const bestSellerProducts = allProducts;

    // New Arrival
    const newArrivalProducts = allProducts;

    // Discount
    const discountProduct = allProducts;;

    setFeatured(featuredProducts);
    setTrending(trendingProducts);
    setBestSeller(bestSellerProducts);
    setNewArrival(newArrivalProducts);
    setDiscount(discountProduct);
    setRelated(allProducts);
  };

  return (
    <>
      <TrendingSlider products={trending} />
      <FeaturedSlider products={featured} />
      <BestSellerSlider products={bestSeller} />
      <NewArrivalTabSlider products={newArrival} />
      <DiscountSlider products={discount} />
      <RelatedSlider products={related} />
    </>
  );
};
