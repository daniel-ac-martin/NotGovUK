import { useEffect, useState } from 'react';

// Inspired by:
// - https://tech.willhaben.at/how-to-shoot-yourself-in-the-foot-in-react-401e7dbba720
// - https://www.joshwcomeau.com/react/the-perils-of-rehydration/
export const useIsMounted = (): boolean => {
  const [ isMounted, setIsMounted ] = useState(false);
  const markAsMounted = () => setIsMounted(true);

  useEffect(markAsMounted, [])

  return isMounted;
};
