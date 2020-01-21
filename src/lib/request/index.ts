import { useLocation as useRawLocation } from 'react-router-dom';
import { parse as qsParse } from './query-string';
import { urlParse } from './url-parse';

const useLocation = () => {
  const location = useRawLocation();

  return {
    ...location,
    query: qsParse(location.search)
  };
};

export {
  urlParse,
  useLocation
};
