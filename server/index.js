if (process.env.NODE_ENV === 'production') {
  require('./main');
} else {
  require('nodemon')({ script: 'server/dev' });
}