'use strict';
const defaults = {
  fileReplacePattern: /\..+$/,
  inject: true
};

export default (options) => {
  const cloned = {};
  for ( const opt in defaults ) {
    cloned[opt] = defaults[opt];
  }
  for ( const option in options ) {
    cloned[option] = options[option];
  }
  return cloned;
};