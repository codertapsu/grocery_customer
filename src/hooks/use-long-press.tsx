import { RefObject, useEffect } from 'react';
import { fromEvent, merge, of, timer } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

interface Option {
  threshold: number;
}

export const useLongPress = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
  callback: () => void,
  option?: Option,
) => {
  useEffect(() => {
    const mousedown = fromEvent<MouseEvent>(elementRef.current, 'mousedown').pipe(
      filter((event) => event.button == 0), // Only allow left button (Primary button)
      map(() => true), // turn on threshold counter
    );
    const touchstart = fromEvent(elementRef.current, 'touchstart').pipe(map(() => true));
    const touchEnd = fromEvent(elementRef.current, 'touchend').pipe(map(() => false));
    const mouseup = fromEvent<MouseEvent>(window, 'mouseup').pipe(
      filter((event) => event.button == 0), // Only allow left button (Primary button)
      map(() => false), // reset threshold counter
    );
    const eventSubscribe = merge(mousedown, mouseup, touchstart, touchEnd)
      .pipe(
        switchMap((state) => (state ? timer(option?.threshold || 500, 100) : of(null))),
        filter((value) => !!value),
      )
      .subscribe(() => {
        callback();
      });

    return () => {
      eventSubscribe.unsubscribe();
    };
  }, [elementRef, callback]);
};
