import { AdsBanner } from '@components/ads-banner';
import { DealDay } from '@components/deal-day';
import { ExplorePopularCategories } from '@components/explore-popular-categories';
import { GoodOffer } from '@components/good-offers';
import { GroupProductSlides } from '@components/group-product-slides';
import { IntroSlide, IntroSlides } from '@components/intro-slide';
import { Layout } from '@components/layout2';
import { Seo } from '@components/seo';
import { ServicesBanner } from '@components/services-banner';
import { SubBox } from '@components/sub-box';

import type { NextPage } from 'next';
// import { getSession } from 'next-auth/react';

const intros: IntroSlide[] = [
  {
    bgImage: `/assets/images/demos/demo-2/slider/slide-1.jpg`,
    title: `Find Comfort <br />That Suits You.`,
    subTittle: `Bedroom Furniture`,
    actionLink: `/categories`,
    actionTitle: `Shop Now`,
  },
  {
    bgImage: `/assets/images/demos/demo-2/slider/slide-2.jpg`,
    title: `
    Ypperlig <br />
    Coffee Table <br />
    <span className='text-primary'>
      <sup>$</sup>49,99
    </span>`,
    subTittle: `Deals and Promotions`,
    actionLink: `/categories`,
    actionTitle: `Shop Now`,
  },
  {
    bgImage: `/assets/images/demos/demo-2/slider/slide-3.jpg`,
    title: `
    Make Your Living Room <br />
    Work For You.
    <br />
    <span className='text-primary'>
      <sup className='font-weight-light text-white'>from</sup>
      <sup>$</sup>9,99
    </span>`,
    subTittle: `Living Room`,
    actionLink: `/categories`,
    actionTitle: `Shop Now`,
  },
];

const Home: NextPage = ({ products }: any) => {
  return (
    <Layout>
      <Seo templateTitle='Components' description='Pre-built components with awesome default' />
      <main className='main'>
        <IntroSlides intros={intros} />
        <div className='mb-4'></div>
        <div className='container'>
          <ExplorePopularCategories />
        </div>
        <div className='mb-2'></div>
        <GoodOffer />
        <div className='mb-3'></div>
        <div className='container'>
          <ServicesBanner />
        </div>
        <div className='bg-light pt-3 pb-5'>
          <div className='container'>
            <GroupProductSlides />
          </div>
        </div>
        <div className='mb-3'></div>
        <div className='pt-3 pb-5'>
          <div className='container'>
            <GroupProductSlides />
          </div>
        </div>
        <div>
          <DealDay countTo={new Date('Oct 12, 2022 23:59:59')} products={[]} />
        </div>
        <div className='pt-3 pb-5'>
          <div className='container'>
            <GroupProductSlides />
          </div>
        </div>
        <div className='mb-3'></div>
        <AdsBanner />
        <div className='pt-3 pb-5'>
          <div className='container'>
            <GroupProductSlides />
          </div>
        </div>
        <div>
          <SubBox />
        </div>
      </main>
      {/* <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Test buy with ETH &rarr;</h2>
            <EthBuyButton productPrice={10.5}></EthBuyButton>
          </div>
          <div className={styles.card}>
            <h2>Test buy with coin &rarr;</h2>
            <CoinBuyButton productPrice={15.5}></CoinBuyButton>
          </div>
        </div>
      </main> */}
    </Layout>
  );
  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>Create Next App</title>
  //       <meta name="description" content="Generated by create next app" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <main className={styles.main}>
  //       <h1 className={styles.title}>
  //         Welcome to <a href="https://nextjs.org">Next.js!</a>
  //       </h1>

  //       <p className={styles.description}>
  //         Get started by editing{' '}
  //         <code className={styles.code}>pages/index.tsx</code>
  //       </p>

  //       <div className={styles.grid}>
  //         <a href="https://nextjs.org/docs" className={styles.card}>
  //           <h2>Documentation &rarr;</h2>
  //           <p>Find in-depth information about Next.js features and API.</p>
  //         </a>

  //         <a href="https://nextjs.org/learn" className={styles.card}>
  //           <h2>Learn &rarr;</h2>
  //           <p>Learn about Next.js in an interactive course with quizzes!</p>
  //         </a>

  //         <a
  //           href="https://github.com/vercel/next.js/tree/canary/examples"
  //           className={styles.card}
  //         >
  //           <h2>Examples &rarr;</h2>
  //           <p>Discover and deploy boilerplate example Next.js projects.</p>
  //         </a>

  //         <a
  //           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  //           className={styles.card}
  //         >
  //           <h2>Deploy &rarr;</h2>
  //           <p>
  //             Instantly deploy your Next.js site to a public URL with Vercel.
  //           </p>
  //         </a>
  //       </div>
  //     </main>

  //     <footer className={styles.footer}>
  //       <a
  //         href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Powered by{' '}
  //         <span className={styles.logo}>
  //           <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
  //         </span>
  //       </a>
  //     </footer>
  //   </div>
  // )
};

export default Home;

export async function getServerSideProps(context) {
  // const session = await getSession(context);
  const products = await fetch('https://fakestoreapi.com/products');

  return {
    props: {
      products: [],
    },
  };
}
