import { removeAccents } from './remove-accents.function';

export function simplify(text: string) {
  const separators = /[\s\,\.\;\:\(\)\-\'\+]/g;

  text = removeAccents(text.toUpperCase()).normalize('NFD');

  const array = text
    .split(separators)
    .filter((item, pos, self) => self.indexOf(item) == pos);

  return array.filter((item) => item);
}
