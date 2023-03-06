import ProductRepository from '../repositories/product.repository.js';
import SupplierRepository from '../repositories/supplier.repository.js';
import SaleRepository from '../repositories/sale.repository.js';
import productInfoRepository from '../repositories/productInfo.repository.js';

async function createProduct(product) {
  if (await SupplierRepository.getSupplier(product.supplierId)) {
    return await ProductRepository.insertProduct(product);
  }

  throw new Error('O id do fornecedor não existe.');
}

async function getProducts() {
  return await ProductRepository.getProducts();
}

async function getProduct(id) {
  const product = await ProductRepository.getProduct(id);
  product.info = await productInfoRepository.getProductInfo(parseInt(id));
  return product;
}

async function deleteProduct(id) {
  const sales = await SaleRepository.getSalesByProductId(id);
  if (sales.length > 0) {
    throw new Error('Não é possível excluir o produto pois ele possui vendas.');
  }
  await ProductRepository.deleteProduct(id);
  await productInfoRepository.deleteProductInfo(id);
}

async function updateProduct(product) {
  if (await SupplierRepository.getSupplier(product.supplierId)) {
    return await ProductRepository.updateProduct(product);
  }

  throw new Error('O id do fornecedor não existe.');
}

async function createProductInfo(productInfo) {
  await productInfoRepository.createProductInfo(productInfo);
}

async function updateProductInfo(productInfo) {
  await productInfoRepository.updateProductInfo(productInfo);
}

async function createReview(review, productId) {
  await productInfoRepository.createReview(review, productId);
}

async function deleteReview(productId, index) {
  await productInfoRepository.deleteReview(parseInt(productId), index);
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProductInfo,
  updateProductInfo,
  createReview,
  deleteReview,
};
