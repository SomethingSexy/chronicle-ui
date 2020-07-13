import { Chronicle } from '../atoms/chronicles';
import { compose } from '../utils/compose';

// TODO: This is very temporary
const chronicleCache: {
  [id: string]: Chronicle;
} = {};
let counter = 0;
// TODO: End temporary

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
