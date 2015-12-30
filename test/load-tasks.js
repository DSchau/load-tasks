import loadTasks from '../src/';

const globs = [
  './test/tasks/*.js'
];

export default loadTasks(globs, {
  src() {},
  pipe() {},
  dest() {}
}, {
  value: true
});
