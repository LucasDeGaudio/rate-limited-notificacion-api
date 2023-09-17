import type { Config } from '@jest/types';
import jestConf from './jest.config';

const config: Config.InitialOptions = {
  ...jestConf,
  testRegex: 'unit.test.ts',
};

export default config;
