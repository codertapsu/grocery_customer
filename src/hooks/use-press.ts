// import { useCallback, useEffect, useRef, useState } from 'react';

// export function usePress<T extends HTMLElement>(callback: () => void) {
//   const ref = useRef<T>(null);
//   const [longPressTriggered, setLongPressTriggered] = useState(false);

//   const start = useCallback(
//     (event) => {
//       if (shouldPreventDefault && event.target) {
//         event.target.addEventListener('touchend', preventDefault, {
//           passive: false,
//         });
//         target.current = event.target;
//       }
//       timeout.current = setTimeout(() => {
//         onLongPress(event);
//         setLongPressTriggered(true);
//       }, delay);
//     },
//     [onLongPress, delay, shouldPreventDefault],
//   );

//   const clear = useCallback(
//     (event, shouldTriggerClick = true) => {
//       timeout.current && clearTimeout(timeout.current);
//       shouldTriggerClick && !longPressTriggered && onClick();
//       setLongPressTriggered(false);
//       if (shouldPreventDefault && target.current) {
//         target.current.removeEventListener('touchend', preventDefault);
//       }
//     },
//     [shouldPreventDefault, onClick, longPressTriggered],
//   );

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) {
//       return;
//     }
//     element.addEventListener('mousedown', start);
//     element.addEventListener('touchstart', start);

//     element.addEventListener('mouseup', clear);
//     // element.addEventListener('mouseleave', clear);
//     element.addEventListener('touchend', clear);

//     // onMouseDown: e => start(e),
//     // onTouchStart: e => start(e),
//     // onMouseUp: e => clear(e),
//     // onMouseLeave: e => clear(e, false),
//     // onTouchEnd: e => clear(e)

//     return () => {};
//   }, [ref]);

//   return ref;
// }
export {};
