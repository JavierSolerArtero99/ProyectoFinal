/* eslint-disable global-require */

const images = {
  'morning': require('../images/dia.png'),
  'afternoon': require('../images/tarde.png'),
  'night': require('../images/noche.png'),
};

export default time => images[time];
