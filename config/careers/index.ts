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

const careerConfig: CareerConfig = {
  programming,
  marketing,
  graphics,
  photography,
  music,
  teaching,
};

export default careerConfig;
