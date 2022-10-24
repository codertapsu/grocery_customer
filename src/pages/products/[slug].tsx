import React from 'react';
import { ProductDetails } from '@components/ecommerce/ProductDetails';
import { Layout } from '@components/layout/layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next/types';
import { findProductIndex } from '@contexts/redux-store/util/util';
import { Product } from '@models/product.model';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  product: Product;
}

interface ParsedParams extends ParsedUrlQuery {
  slug: string;
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedParams> = async (context) => {
  const request = await fetch(`https://server.toampk.xyz/api/products`);
  const allProducts: Product[] = await request.json();

  // Get the paths we want to pre-render based on posts
  const paths = allProducts.map((product) => ({
    params: { slug: product.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, ParsedParams> = async (context) => {
  const { params } = context;
  const slug = params.slug;

  const request = await fetch(`https://server.toampk.xyz/api/products/${slug}`);
  const product: Product = await request.json();
  return {
    props: {
      product,
    },
  };
};

const ProductId: NextPage<Props> = ({ product }) => {
  return (
    <>
      <Layout parent='Home' sub='Shop' subChild={product.name}>
        <div className='container'>
          <div className='col-xl-10 col-lg-12 m-auto'>
            <ProductDetails product={product} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductId;
