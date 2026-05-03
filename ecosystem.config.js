const path = require('path');
module.exports = {
  apps: [{
    name: 'ytranscribe',
    script: path.join(__dirname, 'server.js'),
  }],
};
