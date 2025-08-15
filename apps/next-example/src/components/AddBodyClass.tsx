'use client';

import { useEffect } from 'react';

export const AddBodyClass = () => {
  useEffect(() => {
    document.body.classList.add('js-enabled');
  }, []);

  return null;
}

export default AddBodyClass;
