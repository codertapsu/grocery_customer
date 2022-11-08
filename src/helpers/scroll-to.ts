// https://codepen.io/dankreiger5/pen/XaWddK?editors=1010
// thanks to https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
export const scrollToSmooth = (
  destination: number | HTMLElement,
  duration = 200,
  easing = 'linear',
  callback?: () => void,
) => {
  const easings = {
    linear(t) {
      return t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset,
  );

  if ('requestAnimationFrame' in window === false) {
    window.scrollTo({ top: destinationOffsetToScroll, behavior: 'smooth' });
    // window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  const scroll = () => {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  };

  scroll();
};
