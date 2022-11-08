import { Layout } from '@components/layout/layout';
import { WishlistTable } from '@components/wishlist-table';
import { useWishlist } from '@contexts/wishlist';

const Wishlist = () => {
  const { products } = useWishlist();

  return (
    <>
      <Layout parent='Home' sub='Shop' subChild='Wishlist'>
        <section className='mt-50 mb-50'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-10 col-lg-12 m-auto'>
                {products.length > 0 ? <WishlistTable /> : <h4 className='mb-0'>No Products</h4>}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Wishlist;
