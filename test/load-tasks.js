import gulpLoadTasks from '../src/';

export default gulpLoadTasks('./test/tasks/*.js', {
  src() {},
  pipe() {},
  dest() {}
}, {
  value: true
});