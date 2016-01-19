export default (task, args = []) => {
  if ( task.default ) {
    const props = Object.keys(task).filter((key) => key !== 'default');
    if ( !props.length ) {
      return task.default;
    }
    if ( typeof task.default === 'function' ) {
      task.default = task.default(...args);
    }
  }
  return task;
};
