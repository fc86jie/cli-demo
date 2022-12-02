/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2022-12-02 19:37:03
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2022-12-02 20:06:22
 * @FilePath: \tool\src\logger.js
 * @Description:
 */

/**
 * PowerShell中使用debug
 * 1. 设置环境变量 $env:DEBUG = "*,-not_this"
 * 2. $env:DEBUG="name";tool --start，显示name的全部日志，name为*时时全部日志
 */

import chalk from 'chalk';
import debug from 'debug';

export default name => {
  return {
    log: (...args) => console.log(chalk.gray(...args)),
    warning: (...args) => console.log(chalk.yellow(...args)),
    highlight: (...args) => console.log(chalk.bgCyanBright(...args)),
    debug: debug(name),
  };
};
