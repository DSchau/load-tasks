'use strict';
/*
 * This is a (probably naive) method to add es6 non-default exports to object/fn
 */
export default (task) => {
  let returnedTask = task;
  if ( task.default ) {
    const props = Object.keys(task).filter((key) => key !== 'default');
    if ( !props.length ) {
      returnedTask = returnedTask.default;
    }
    for ( let prop of props ) {
      const obj = task[prop];
      if ( typeof task.default === 'function' ) {
        task.default.prototype[prop] = obj;
      } else {
        task.default[prop] = obj;
      }
    }
  }
  return returnedTask;
};
