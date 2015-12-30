'use strict';
import globby from 'globby';
import path from 'path';

export default (pattern, ...args) => {
  const tasks = {};
  for ( let file of globby.sync(pattern) ) {
    const name = file.replace(/\.[\w\d]+$/, '').split('/').pop();
    let task = require(path.resolve(file));
    task = task.default ? task.default : task;
    tasks[name] = typeof task === 'function' ? task.apply(this, args) : task;
  }
  return tasks;
};
