import gulpLoadTasks from '../src/';

const globs = [
  './test/tasks/*.js'
];

export default gulpLoadTasks(globs, {
  src() {},
  pipe() {},
  dest() {}
}, {
  value: true
});
