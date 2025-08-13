export function up(knex) {
  return knex.schema.createTable('agreements', (table) => {
    table.increments('id').primary();
    table.string('tenant_first_name').notNullable();
    table.string('tenant_last_name').notNullable();
    table.string('property_address').notNullable();
    table.jsonb('agreement_data').notNullable();
    table.string('pdf_filename');
    table.timestamps(true, true); 
  });
}

export function down(knex) {
  return knex.schema.dropTable('agreements');
} 