'use strict';
/*
 * This is a (probably naive) method to add es6 non-default exports to object/fn
 */
export default (task, args) => {
  if ( task.default ) {
    const props = Object.keys(task).filter((key) => key !== 'default');
    if ( !props.length ) {
      return task.default;
    }
    if ( typeof task.default === 'function' ) {
      task.default = task.default.apply(this, args);
    }
  }
  return task;
};
