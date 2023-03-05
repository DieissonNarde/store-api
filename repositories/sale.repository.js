// import { connect } from './db.js';
import Sale from '../models/sale.model.js';
import Product from '../models/product.model.js';
import Client from '../models/client.model.js';

async function insertSale(sale) {
  try {
    return await Sale.create(sale);
  } catch (err) {
    throw err;
  }

  // const conn = await connect();
  // try {
  //   const sql =
  //     'INSERT INTO sales (value, date, sale_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *';
  //   const values = [sale.value, sale.date, sale.sale_id, sale.product_id];
  //   const res = await conn.query(sql, values);
  //   return res.rows[0];
  // } catch (err) {
  //   throw err;
  // } finally {
  //   conn.release();
  // }
}

async function getSales() {
  try {
    return await Sale.findAll({
      include: [
        {
          model: Product,
        },
        {
          model: Client,
        },
      ],
    });
  } catch (err) {
    throw err;
  }

  // const conn = await connect();
  // try {
  //   const res = await conn.query('SELECT * FROM sales');
  //   return res.rows;
  // } catch (err) {
  //   throw err;
  // } finally {
  //   conn.release();
  // }
}

async function getSalesByProductId(productId) {
  try {
    return await Sale.findAll({
      where: {
        productId,
      },
      include: [
        {
          model: Client,
        },
      ],
    });
  } catch (err) {
    throw err;
  }

  // const conn = await connect();
  // try {
  //   const res = await conn.query('SELECT * FROM sales WHERE product_id = $1', [
  //     product_id,
  //   ]);
  //   return res.rows;
  // } catch (err) {
  //   throw err;
  // } finally {
  //   conn.release();
  // }
}

async function getSale(id) {
  try {
    return await Sale.findByPk(id, {
      include: [
        {
          model: Product,
        },
        {
          model: Client,
        },
      ],
    });
  } catch (err) {
    throw err;
  }

  // const conn = await connect();
  // try {
  //   const res = await conn.query('SELECT * FROM sales WHERE sale_id = $1', [
  //     id,
  //   ]);
  //   return res.rows[0];
  // } catch (err) {
  //   throw err;
  // } finally {
  //   conn.release();
  // }
}

async function deleteSale(id) {
  try {
    await Sale.destroy({
      where: {
        saleId: id,
      },
    });
  } catch (err) {
    throw err;
  }

  // const conn = await connect();
  // try {
  //   await conn.query('DELETE FROM sales WHERE sale_id = $1', [id]);
  // } catch (err) {
  //   throw err;
  // } finally {
  //   conn.release();
  // }
}

async function updateSale(sale) {
  try {
    await Sale.update(
      {
        value: sale.value,
        date: sale.date,
      },
      {
        where: {
          saleId: sale.saleId,
        },
      }
    );
    return await getSale(sale.saleId);
  } catch (err) {
    throw err;
  }

  // const conn = await connect();
  // try {
  //   const sql =
  //     'UPDATE sales SET value = $1, date = $2 WHERE sale_id = $3 RETURNING *';
  //   const values = [sale.value, sale.date, sale.sale_id];
  //   const res = await conn.query(sql, values);
  //   return res.rows[0];
  // } catch (err) {
  //   throw err;
  // } finally {
  //   conn.release();
  // }
}

export default {
  insertSale,
  getSales,
  getSalesByProductId,
  getSale,
  updateSale,
  deleteSale,
};
