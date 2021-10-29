import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username', 45).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('first_name', 30).notNullable();
    table.string('last_name', 30).notNullable();
    table.string('user_group', 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
