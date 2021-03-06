'use strict';
import { expect } from 'chai';
import globby from 'globby';

import tasks, { LoadTasks, ERROR_MESSAGE, testGlob } from './fixtures/load-tasks';

const hasFn = (name, obj=tasks) => {
  expect(obj).to.respondTo(name);
};

const expected = globby.sync(testGlob).map((file) => {
  return file.split('/').pop().replace(/\..+$/, '');
});

describe('load-tasks', () => {
  it('throws an error if glob not supplied', () => {
    expect(() => new LoadTasks()()).to.throw(ERROR_MESSAGE)
  });

  it('returns empty object when glob doesn\'t match', () => {
    expect(new LoadTasks('unmatched/folder/*.js')()).to.deep.equal({});
  });

  it('returns an object when glob matches', () => {
    expect(tasks).not.to.be.empty;
  });

  describe('options API', () => {
    it('allows file regular expression to be customized', () => {
      const optionsTasks = new LoadTasks('test/fixtures/tasks/es6.js', { fileReplacePattern: ''})();
      expect(optionsTasks).to.have.key('es6.js');
    });

    it.skip('allows injection to be turned off', () => {
      const optionsTasks = new LoadTasks('test/fixtures/tasks/es6.js', { inject: false })({
        test: true
      });
      expect(optionsTasks.es6().length).equal(0);
    });
  });

  describe('file behavior', () => {
    it('contains each task/file name', () => {
      expect(tasks).to.have.all.keys(expected);
    });

    for ( let args of ['common', 'es6', ['foo', tasks.obj]] ) {
      const argsArr = args.constructor === Array ? args : [args];
      it(`handles ${argsArr[0]} export`, () => {
        hasFn(...argsArr);
      });
    }

    it('handles file with out export(s)', () => {
      const { ['no-export'] : noExport } = tasks;
      expect(typeof noExport).to.equal('object');
    });

    it('when function, injects supplied arguments', () => {
      const customObj = { test: true };
      const customTask = new LoadTasks('test/fixtures/tasks/es6.js')(customObj);
      expect(customTask.es6().shift()).to.deep.equal(customObj);
    });

    it('extends task objects when conflicts', () => {
      const { copy } = new LoadTasks([
        'test/fixtures/tasks/copy.js',
        'test/fixtures/tasks-two/copy.js'
      ])();
      expect(copy).to.have.all.keys([
        'assets',
        'files'
      ]);
    });
  });
});
