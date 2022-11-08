import Link from 'next/link';

interface Props {
  parent: string;
  sub: string;
  subChild: string;
  noBreadcrumb: string;
}

export const Breadcrumb = ({ parent, sub, subChild, noBreadcrumb }: Props) => {
  return (
    <>
      <div className={`page-header breadcrumb-wrap ${noBreadcrumb}`}>
        <div className='container'>
          <div className='breadcrumb'>
            <Link href='/'>{parent}</Link>
            <span></span> {sub}
            <span></span> {subChild}
          </div>
        </div>
      </div>
    </>
  );
};
