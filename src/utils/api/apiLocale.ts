import { readdirSync } from 'fs';
import path from 'path';

import { PATH } from '../constantes';

export function getChampionFiles(champion: string) {
  const dirLoading = path.resolve(process.cwd(), 'public/' + PATH.LOADING);
  const files: string[] = readdirSync(path.join(dirLoading), 'utf8');
  const filesChamp = files.filter((file) => file.toLowerCase().startsWith(champion)).map(file => PATH.LOADING + file);

  return filesChamp;
}
