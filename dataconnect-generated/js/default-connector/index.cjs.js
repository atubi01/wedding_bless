const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'wedding_bless',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

