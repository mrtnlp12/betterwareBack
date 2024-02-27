import db from '../config/db';
import { ProductDTO } from '../dtos/product';
import { CashSaleDTO, CreditSaleDTO } from '../dtos/sale';

export const registerProduct = async (product: ProductDTO) => {
  return await db.product.create({
    data: product
  });
}

export const listProducts = async () => {
  return await db.product.findMany();
}

export const getProduct = async (codigo_barras: string) => {
  return await db.product.findUnique({
    where: { codigo_barras }
  });
}

export const decreaseStock = async (sales: (CashSaleDTO | CreditSaleDTO)[]) => {
  for (const sale of sales) {
    await db.product.update({
      where: { codigo_barras: sale.id_producto },
      data: {
        cantidad: {
          decrement: sale.cantidad
        }
      }
    });
  }

}

export const listTypes = async () => {
  return await db.productType.findMany();
}

export const updateProduct = async (codigo_barras: string, product: ProductDTO) => {
  return await db.product.update({
    where: { codigo_barras },
    data: product
  });
}
