'use strict';
/*
 * This is a (probably naive) method to add es6 non-default exports to object/fn
 */
export default (task) => {
  if ( task.default ) {
    const props = Object.keys(task).filter((key) => key !== 'default');
    for ( let prop of props ) {
      task.default[prop] = task[prop];
    }
  }
  return task.default || task;
};
