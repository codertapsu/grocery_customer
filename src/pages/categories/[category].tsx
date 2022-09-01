import Layout from '@components/layout';
import Seo from '@components/seo';
import { useRouter } from 'next/router';


export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <Layout>
      <Seo />
      <main>
        Category
      </main>
    </Layout>
  );
}
