'use strict';
import LoadTasks, { ERROR_MESSAGE } from '../../src/';

export { LoadTasks, ERROR_MESSAGE };

export const testGlob = [
  'test/fixtures/tasks/*.js'
];

export default new LoadTasks(testGlob)({
  src() {},
  pipe() {},
  dest() {}
}, {
  someValue: true
});
