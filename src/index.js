'use strict';
import globby from 'globby';
import path from 'path';

import addProperties from './add-properties';
import defaultsFn from './defaults';

export const ERROR_MESSAGE = 'A globbing pattern is required as the first argument.';

export default function LoadTasks(glob, options = {}) {
  if ( !glob ) {
    throw new Error(ERROR_MESSAGE);
  }
  const defaults = defaultsFn(options);
  return function taskObject(...args) {
    const tasks = {};
    for ( let file of globby.sync(glob) ) {
      const name = file.split('/').pop().replace(defaults.fileReplacePattern, '');
      let task = addProperties(require(path.resolve(file), args));
      tasks[name] = typeof task === 'function' ?
        task.apply(this, args) :
        task;
    }
    return tasks;
  };
}
