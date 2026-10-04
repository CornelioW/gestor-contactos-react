import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      const parsed = stored === null ? initialValue : JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('No se pudieron guardar los contactos:', error);
    }
  }, [key, value]);

  return [value, setValue];
}
