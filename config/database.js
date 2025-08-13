import dotenv from "dotenv";
import Anvil from '@anvilco/anvil';

dotenv.config();

// Check for required environment variables
if (!process.env.ANVIL_API_KEY) {
  console.error('❌ ANVIL_API_KEY environment variable is required');
  console.error('Please set it in your .env file or environment');
  console.error('The server will start but PDF operations will fail without a valid API key.');
  console.error('');
}

export const config = {
  port: process.env.PORT || 3000,
  anvilApiKey: process.env.ANVIL_API_KEY,
  anvilTemplateId: process.env.ANVIL_TEMPLATE_ID,
  database: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'anvil_demo'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

export const anvilClient = config.anvilApiKey ? new Anvil({ apiKey: config.anvilApiKey }) : null;

if (!process.env.ANVIL_TEMPLATE_ID) {
  console.warn('⚠️  Set ANVIL_TEMPLATE_ID in your .env file for production.');
} 