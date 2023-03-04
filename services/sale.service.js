import SaleRepository from '../repositories/sale.repository.js';
import ClientRepository from '../repositories/client.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import saleRepository from '../repositories/sale.repository.js';

async function createSale(sale) {
  let error = '';
  if (!(await ClientRepository.getClient(sale.client_id))) {
    error = 'O id do cliente informado não existe. ';
  }

  const product = await ProductRepository.getProduct(sale.product_id);

  if (!product) {
    error += 'O id do produto informado não existe.';
  }
  if (error) {
    throw new Error(error);
  }

  if (product.stock > 0) {
    sale = await saleRepository.insertSale(sale);
    product.stock--;
    await ProductRepository.updateProduct(product);
    return sale;
  } else {
    throw new Error('O produto informado não possui estoque.');
  }
}

async function getSales() {
  return await SaleRepository.getSales();
}

async function getSale(id) {
  return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
  const sale = await SaleRepository.getSale(id);
  if (sale) {
    const product = await ProductRepository.getProduct(sale.product_id);
    await SaleRepository.deleteSale(id);
    product.stock++;
    await ProductRepository.updateProduct(product);
  } else {
    throw new Error('O id da sale informado não existe.');
  }
}

async function updateSale(sale) {
  let error = '';
  if (!(await ClientRepository.getClient(sale.client_id))) {
    error = 'O id do cliente informado não existe. ';
  }
  if (!(await ProductRepository.getProduct(sale.product_id))) {
    error += 'O id do produto informado não existe.';
  }
  if (error) {
    throw new Error(error);
  }

  return await SaleRepository.updateSale(sale);
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
