import { CareerMapType } from './careerType';
import { programming } from './programming';
import { marketing } from './marketing';

interface CareerConfig {
  programming: CareerMapType[];
  marketing: CareerMapType[];
}

const careerConfig: CareerConfig = {
  programming,
  marketing,
};

export default careerConfig;
