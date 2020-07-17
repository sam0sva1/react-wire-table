import { TItem } from '../types';

export function selectPath(kit: TItem, path: string): (string | number | undefined | null) {
  if (typeof path !== 'undefined' && typeof path === 'string') {
    const parts = path.replace(']', '').replace('[', '.').split('.');
    const len = parts.length;

    let temp = kit;
    let result;

    for (let i = 0; i < len; i += 1) {
      if (temp && typeof temp === 'object' && parts[i] in temp) {
        temp = temp[parts[i]];

        if (i === len - 1) {
          result = temp as any;
        }
      } else {
        return undefined;
      }
    }

    return result;
  }

  return undefined;
}