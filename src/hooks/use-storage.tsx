import localforage from 'localforage';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { useEventCallback } from './use-event-callback';

type SetValue<T> = Dispatch<SetStateAction<T>>

localforage.config({
  name: 'Grocery app',
  storeName: 'dataStoreGroceryApp',
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  description: 'Local storage used in app',
});

function useStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readValue = useCallback(async () => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = await localforage.getItem<T>(key);
      return item ?? initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [initialValue, key])

  const [storedValue, setStoredValue] = useState<T>();

  const setValue: SetValue<T> = useEventCallback(value => {
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      )
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value
      window.localStorage.setItem(key, JSON.stringify(newValue))
      setStoredValue(newValue)
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  })

  useEffect(() => {
    readValue().then(value => setStoredValue(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return
      }
      readValue().then(value => setStoredValue(value));
    },
    [key, readValue],
  )

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange)

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener('local-storage', handleStorageChange)

  return [storedValue, setValue]
}

export { useStorage };
