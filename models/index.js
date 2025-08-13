import knex from 'knex';
import bookshelf from 'bookshelf';
import { config } from '../config/database.js';

const db = knex(config.database);

const bookshelfInstance = bookshelf(db);



export default bookshelfInstance; 