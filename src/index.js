'use strict';
import globby from 'globby';
import path from 'path';

export default (glob, ...args) => {
  const tasks = {};
  if ( !glob ) {
    return tasks;
  }
  for ( let file of globby.sync(glob) ) {
    const name = file.replace(/\.[\w\d]+$/, '').split('/').pop();
    let task = require(path.resolve(file));
    task = task.default ? task.default : task;
    tasks[name] = typeof task === 'function' ? task.apply(this, args) : task;
  }
  return tasks;
};
