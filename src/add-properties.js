'use strict';
/*
 * This is a (probably naive) method to add es6 non-default exports to object/fn
 */
export default (task) => {
  if ( task.default ) {
    for ( let prop in task ) {
      if ( prop !== 'default' ) {
        task.default[prop] = task[prop];
      }
    }
  }
  return task.default ? task.default : task;
};
