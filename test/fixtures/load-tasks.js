import path from 'path';

import LoadTasks, { ERROR_MESSAGE } from '../../src/';

export { LoadTasks, ERROR_MESSAGE };

export const testGlob = [
  path.resolve('./test/fixtures/tasks')
];

export { path };

export default new LoadTasks(testGlob)({
  src() {},
  pipe() {},
  dest() {}
}, {
  someValue: true
});
