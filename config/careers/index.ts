import { CareerMapType } from './careerType';
import { programming } from './programming';
import { marketing } from './marketing';
import { graphics } from './graphics';
import { photography } from './photography';
import { music } from './music';
import { teaching } from './teaching';

interface CareerConfig {
  programming: CareerMapType[];
  graphics: CareerMapType[];
  photography: CareerMapType[];
  music: CareerMapType[];
  teaching: CareerMapType[];
  marketing: CareerMapType[];
}

export const careerConfig: CareerConfig = {
  programming,
  marketing,
  graphics,
  photography,
  music,
  teaching,
};

const careerMerge = [
  ...careerConfig.programming, 
  ...careerConfig.marketing,
  ...careerConfig.graphics,
  ...careerConfig.photography,
  ...careerConfig.music,
  ...careerConfig.teaching,
].reduce((previous, current) => {
  previous[current.id] ? [ ...previous[current.id].id, ...current.id ] : previous[current.id] = current;
  return previous;
}, {});

export const output = Object.values(careerMerge);

// export default careerConfig;
