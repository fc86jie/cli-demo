/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2022-12-02 18:35:52
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2022-12-02 19:42:27
 * @FilePath: \tool\src\config\config-mgr.js
 * @Description: 使用cosmiconfig替代pkg-up,可以查找package.json中的以tool为key的配置，
 * 没有则继续查找相关的配置文件.toolrc->xxx
 */

import { createRequire } from 'module';
import chalk from 'chalk';
import { cosmiconfigSync } from 'cosmiconfig';
import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';
import createLogger from '../logger.js';

const logger = createLogger('config:mgr');
// 指定查找关键字
const configLoader = cosmiconfigSync('tool');

const require = createRequire(import.meta.url);
const schema = require('./schema.json');

const ajv = new Ajv();

export default () => {
  const result = configLoader.search(process.cwd());
  if (!result) {
    logger.warning('Could not find configuration, using default');
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      logger.warning('Invalid configuration was supplied');
      console.log(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }
    logger.debug('Found configuration', result.config);
    return result.config;
  }
};
