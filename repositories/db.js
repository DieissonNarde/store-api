import pg from 'pg';

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString:
      'postgres://earodnsq:s4FU70Wd8YBuUKSmX28WpdlExEPlGGF8@babar.db.elephantsql.com/earodnsq',
  });
  global.connection = pool;
  return pool.connect();
}

export { connect };
