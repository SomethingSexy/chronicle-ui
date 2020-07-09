import { useRecoilState, useSetRecoilState, useRecoilCallback } from 'recoil';
import { createChronicle } from '../atoms/createChronicle';
import { createState } from '../atoms/state';
import { useHistory } from 'react-router-dom';
import { Chronicle, chronicles } from '../../../atoms/chronicles';
import { useEffect } from 'react';

export const useCreateChronicle = () => {
  const [chronicle, setChronicle] = useRecoilState(createChronicle);
  const setState = useSetRecoilState(createState);
  const history = useHistory();
  const storeChronicle = useRecoilCallback(
    ({ set }) => (c: Chronicle) => {
      set(chronicles(c.id), c);
      setChronicle(null);
      setState(null);
      history.push(`/chronicle/${c.id}`);
    },
    [chronicle]
  );

  useEffect(() => {
    if (chronicle !== null) {
      // TODO this is where we would make the post request
      setState('loading');
      setState('loaded');
      storeChronicle({
        id: '123',
        ...chronicle,
      });
    }
  }, [chronicle]);

  return [setChronicle];
};
