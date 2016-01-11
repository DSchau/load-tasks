'use strict';
export const DEFAULTS = {
  fileReplacePattern: /\..+$/
};

const addOpts = (opts, cloned = {}) => {
  for ( const opt in opts ) {
    cloned[opt] = opts[opt];
  }
  return cloned;
};

export default (options) => {
  return addOpts(options, addOpts(DEFAULTS));
};
