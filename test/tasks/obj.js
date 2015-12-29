'use strict';
export default (gulp, config) => {
  return {
    foo() {
      return config.value;
    }
  };
};
