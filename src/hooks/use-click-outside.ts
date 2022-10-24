import { useRef } from 'react';

import { useOnClickOutside } from 'usehooks-ts';

function useClickOutside<T extends HTMLElement>(callback: (...args: unknown[]) => void) {
  const ref = useRef<T>(null);

  useOnClickOutside(ref, callback);

  return ref;
}

export { useClickOutside };
