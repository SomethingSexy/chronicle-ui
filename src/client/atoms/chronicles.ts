import { atomFamily, selector, selectorFamily } from 'recoil';
import { compose } from '../utils/compose';

export interface Chronicle {
  id: string;
  name: string;
  startingDate?: string;
  city?: string;
  game: string[];
  gameName: string;
}

export const chronicles = atomFamily<Chronicle, string>({
  key: 'Chronicles',
  default: null,
});

export const chroniclesState = selectorFamily<Chronicle, string>({
  key: 'tempCelcius',
  get: (id) => ({ get }) => {
    // const chronicle = get(chronicles(id));
    return compose(
      (c: Chronicle) => ({
        ...c,
        gameName: c.game.join(' '),
      }),
      get,
      chronicles
    )(id);
  },
});
