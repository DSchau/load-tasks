'use strict';
import globby from 'globby';
import path from 'path';

const taskObj = {};

export default (pattern, ...args) => {
  globby.sync(pattern).forEach((file) => {
    const name = file.replace(/\.[\w\d]+$/, '').split('/').pop();
    let task = require(path.resolve(file));
    task = task.default ? task.default : task;
    if ( typeof task === 'function' ) {
      task = task.apply(this, args);
    }
    taskObj[name] = task;
  });
  return taskObj;
};
