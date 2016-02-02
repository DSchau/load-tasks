import requireDir from 'require-dir';
import extend from 'extend';

export const ERROR_MESSAGE = 'A directory or array of directories is required as the first argument.';

export default class LoadTasks {
  constructor(dir) {
    if ( !dir || !dir.length ) {
      throw new Error(ERROR_MESSAGE);
    }
    this.dirs = [].concat(dir);

    return (...args) => {
      const tasks = {};
      for ( const dir of this.dirs ) {
        let files;
        try {
          files = requireDir(dir);
          for ( const fileName in files ) {
            const file = files[fileName];
            if ( typeof file === 'function' ) {
              files[fileName] = file(...args);
            } else if ( file.default && typeof file.default === 'function' ) {
              files[fileName].default = file.default(...args);
            }
          }
        } catch(exception) {
          files = {};
        }
        extend(true, tasks, files);
      }
      return tasks;
    };
  }
};
