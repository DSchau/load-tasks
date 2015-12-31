'use strict';
import globby from 'globby';
import path from 'path';

import addProperties from './add-properties';
import defaultsFn from './defaults';

export const errorMessage = 'A globbing pattern is required as the first argument.';

export default (glob, options = {}) => {
  if ( !glob ) {
    throw new Error(errorMessage);
  }
  const defaults = defaultsFn(options);
  return (...args) => {
    const tasks = {};
    for ( let file of globby.sync(glob) ) {
      const name = file.split('/').pop().replace(defaults.fileReplacePattern, '');
      let task = addProperties(require(path.resolve(file)));
      tasks[name] = typeof task === 'function' ?
        task.apply(this, defaults.inject ? args : []) :
        task;
    }
    return tasks;
  };
};
