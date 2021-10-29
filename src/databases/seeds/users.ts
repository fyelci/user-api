import Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  return knex('users').insert([
    {
      id: '3cfbfd84-cdc4-41bb-b92c-ccd0687d0338',
      username: 'admin',
      password: '$2b$10$EZPT7p4XMB4MpZGnQryDpelu2R6LSnurU4wZe7gRYj1YZ0uY2bHby',
      first_name: 'Fulano',
      last_name: 'Admin',
      user_group: 'one.admin.two.three',
    },
    {
      id: '0b6a3eaf-58de-43b1-9a5a-c0be8745e167',
      username: 'user',
      password: '$2b$10$LonEZFvYhQ5RSumTedUR/u49pkToqD1rYrbKeVN5iVAyfOIjH3Tza',
      first_name: 'Mengano',
      last_name: 'User',
      user_group: 'one.user.two.three',
    },
  ]);
}
