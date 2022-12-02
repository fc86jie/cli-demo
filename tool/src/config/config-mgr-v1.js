/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2022-12-02 18:34:50
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2022-12-02 18:35:06
 * @FilePath: \tool\src\commands\config-mgr-v1.js
 * @Description: 使用pkg-up获取package.json
 */
import { createRequire } from 'module';
import chalk from 'chalk';
import { pkgUp } from 'pkg-up';

const require = createRequire(import.meta.url);

export default async () => {
  const pkgPath = await pkgUp();
  const pkg = require(pkgPath);
  if (pkg.tool) {
    console.log('Found configuration', pkg.tool);
    return pkg.tool;
  } else if (hasJSConfigFile()) {
    return loadJSConfigFile();
  } else {
    console.log(chalk.yellow('Could not find configuration, using default'));
    return { port: 1234 };
  }
};
