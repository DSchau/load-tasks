'use strict';
export default (...args) => {
  return () => {
    return args;
  };
};
