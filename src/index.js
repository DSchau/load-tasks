'use strict';
import globby from 'globby';
import extend from 'extend';
import path from 'path';

import addProperties from './add-properties';
import defaultsFn from './defaults';

export const ERROR_MESSAGE = 'A globbing pattern is required as the first argument.';

export default class LoadTasks {
  constructor(glob, options = {}) {
    if ( !glob ) {
      throw new Error(ERROR_MESSAGE);
    }
    this.glob = glob;
    this.defaults = defaultsFn(options);

    return (...args) => {
      const tasks = {};
      for ( let file of globby.sync(this.glob) ) {
        const name = file.split('/').pop().replace(this.defaults.fileReplacePattern, '');
        let task = addProperties(require(path.resolve(file)), args);
        task = typeof task === 'function' ?
          task.apply(this, args) :
          task;
        if ( tasks[name] && typeof tasks[name] === 'object' && typeof task === 'object') {
          tasks[name] = extend(tasks[name], task);
        } else {
          tasks[name] = task;
        }
      }
      return tasks;
    };
  }
};
