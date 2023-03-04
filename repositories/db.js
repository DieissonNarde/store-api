// import pg from 'pg';
import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
});

export default sequelize;

// async function connect() {
//   if (global.connection) {
//     return global.connection.connect();
//   }

//   const pool = new pg.Pool({
//     connectionString: process.env.DB_URL,
//   });
//   global.connection = pool;
//   return pool.connect();
// }

// export { connect };
