import { Button, ButtonLink } from '@components/button';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { IntroSlide } from './intro-slide.model';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

interface Props {
  intros: IntroSlide[];
}

export const IntroSlides = ({ intros }: Props) => {
  return (
    <div className='intro-slider-container'>
      <OwlCarousel nav={false} loop={true} items={1} autoplay={true} dots={true} autoplayTimeout={5000} dotsClass={'owl-dots inner-dots'}>
        {(intros || []).map((item, index) => (
          <div key={index} className='intro-slide' style={{ backgroundImage: `url(${item.bgImage})` }}>
            <div className='intro-content container'>
              <h3 className='intro-subtitle' dangerouslySetInnerHTML={{ __html: item.subTittle }} />
              <h1 className='intro-title' dangerouslySetInnerHTML={{ __html: item.title }} />
              <ButtonLink href={item.actionLink} fillType='filled' cornerType='rounded' themeType='primary'>
                <span>{item.actionTitle}</span>
                <i className='icon-long-arrow-right ms-3' />
              </ButtonLink>
            </div>
          </div>
        ))}
      </OwlCarousel>
      <span className='slider-loader text-white' />
    </div>
  );
};
