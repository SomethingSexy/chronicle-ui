import { Chronicle } from '../atoms/chronicles';
import { compose } from '../utils/compose';

// TODO: This is very temporary
const chronicleCache: {
  [id: string]: Chronicle;
} = {};
let counter = 0;
// TODO: End temporary

const chronicles: Chronicle[] = [
  {
    id: 'foo',
    name: 'My Game',
    game: ['vtm', 'v5'],
    gameName: 'vtm v5',
    characters: [],
    playStyle: 'session',
    plotHook: ''
  }
];

export type CreateChronicle = ({ values }: { errors: object; values: Chronicle }) => Promise<Chronicle>;
export const createChronicle: CreateChronicle = async ({ values }) => {
  await new Promise((r) => setTimeout(r, 1000));
  counter = counter + 1;
  chronicleCache[counter] = compose((c: Chronicle) => ({
    ...c,
    id: counter,
    gameName: c.game.join(' ')
  }))(values);

  return chronicleCache[counter];
};

export type FetchChronicle = (id: string) => Promise<Chronicle>;
export const fetchChronicle: FetchChronicle = async (id: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return chronicleCache[id];
};

export type FetchChronicles = () => Promise<Chronicle[]>;
export const fetchChronicles: FetchChronicles = async () => {
  await new Promise((r) => setTimeout(r, 1000));
  return chronicles;
};
