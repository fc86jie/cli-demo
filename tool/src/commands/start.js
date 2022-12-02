import chalk from 'chalk';
import createLogger from '../logger.js';

const logger = createLogger('commands:start');

export default config => {
  logger.highlight('  Starting the app  ');
  logger.debug('Received configuration', config);
};
