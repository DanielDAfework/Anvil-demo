import { config } from './config/database.js';

export default {
  development: config.database,
  production: config.database,
  test: config.database
}; 