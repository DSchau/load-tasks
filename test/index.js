'use strict';
import { expect } from 'chai';

import tasks, { LoadTasks, ERROR_MESSAGE, path } from './fixtures/load-tasks';

const hasFn = (name, obj=tasks) => {
  expect(obj).to.respondTo(name);
};

describe('load-tasks', () => {
  it('throws error when glob not supplied', () => {
    expect(() => new LoadTasks()).to.throw(ERROR_MESSAGE);
  });

  describe('loading tasks', () => {
    const args = [
      { src: (...args) => { return args; }},
      { value: true }
    ];
    const tasks = new LoadTasks(path.join(__dirname, './fixtures/tasks'))(...args);
    it('returns task object', () => {
      expect(tasks).to.have.all.keys([
        'common',
        'copy',
        'es6',
        'no-export',
        'obj'
      ]);
    });

    it('returns task object with factory function called', () => {
      expect(tasks.common()).to.equal(args[0]);
    });

    it('returns object with properties when object', () => {
      expect(tasks.copy).to.have.all.keys([
        'files'
      ]);
    });

    it('extends object when multiple objects with same name', () => {
      const multiTasks = new LoadTasks([
        path.join(__dirname, './fixtures/tasks'),
        path.join(__dirname, './fixtures/tasks-two')
      ])(...args);
      expect(multiTasks).to.have.all.keys([
        'common',
        'copy',
        'es6',
        'no-export',
        'obj'
      ]);
      expect(multiTasks.copy).to.have.all.keys([
        'files',
        'assets'
      ]);
    });

    it('returns empty object when directory does not exist', () => {
      const tasks = new LoadTasks('./not/a/directory')();
      expect(tasks).to.be.defined;
      expect(tasks).to.deep.equal({});
    });
  });
});
