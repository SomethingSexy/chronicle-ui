import { useLocation } from 'react-router-dom';

export const useQuery = () => {
  const search = new URLSearchParams(useLocation().search).entries();
  let query = {};
  for (let pair of search) {
    query = {
      ...query,
      [pair[0]]: pair[1],
    };
  }

  return query;
};
