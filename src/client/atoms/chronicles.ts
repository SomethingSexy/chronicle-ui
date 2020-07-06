import { atomFamily, selector, selectorFamily } from 'recoil';
import { compose } from '../utils/compose';

export interface Chronicle {
  id: string;
  name: string;
  startingDate?: string;
  city?: string;
  game: string[];
  gameName: string;
  players?: any[];
  characters?: any[];
  // summary
  // description:
  // game tenets
}

export const chronicles = atomFamily<Chronicle, string>({
  key: 'Chronicles',
  default: null,
});

export const chroniclesState = selectorFamily<Chronicle, string>({
  key: 'tempCelcius',
  get: (id) => ({ get }) => {
    const data = compose(get, chronicles)(id);

    if (data === null) {
      // This in theory could stay here since the family will cache the result
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id,
            name: 'Foo',
            game: ['vtm', 'v5'],
            gameName: 'vtm v5',
          });
        }, 5000);
      });
      // return Promise.resolve(
      //   {
      //     id,
      //     name: 'Foo',
      //     game: ['vtm', 'v5'],
      //     gameName: 'vtm v5'
      //   }
      // )
    }

    return compose((c: Chronicle) => ({
      ...c,
      gameName: c.game.join(' '),
    }))(data);
  },
});
