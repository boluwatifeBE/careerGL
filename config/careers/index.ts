import { CareerMapType } from './careerType';
import { programming } from './programming';
import { marketing } from './marketing';
import { graphics } from './graphics';
import { photography } from './photography';
import { music } from './music';
import { writing } from './writing';
import { teaching } from './teaching';

interface CareerConfig {
  programming: CareerMapType[];
  marketing: CareerMapType[];
  graphics: CareerMapType[];
  photography: CareerMapType[];
  music: CareerMapType[];
  writing: CareerMapType[];
  teaching: CareerMapType[];
}

export const careerConfig: CareerConfig = {
  programming,
  marketing,
  graphics,
  photography,
  music,
  writing,
  teaching,
};

const careerMerge = [
  ...careerConfig.programming, 
  ...careerConfig.marketing,
  ...careerConfig.graphics,
  ...careerConfig.photography,
  ...careerConfig.music,
  ...careerConfig.writing,
].reduce((previous, current) => {
  previous[current.id] ? [ ...previous[current.id].id, ...current.id ] : previous[current.id] = current;
  return previous;
}, {});

export const output = Object.values(careerMerge);
