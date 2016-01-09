'use strict';
export const DEFAULTS = {
  fileReplacePattern: /\..+$/,
  inject: true
};

const addOpts = (opts, cloned = {}) => {
  for ( const opt in opts ) {
    cloned[opt] = opts[opt];
  }
  return cloned;
};

export default (options) => {
  const cloned = addOpts(DEFAULTS);
  return addOpts(options, cloned);
};
