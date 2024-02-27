import db from '../config/db';
import { CashSaleDTO, CreditSaleDTO, SaleDTO } from '../dtos/sale';

export const getSales = async () => {
  return await db.sale.findMany({
    include: {
      cashSales: true,
    }
  });
}

export const getSale = async (id: string) => {
  return await db.sale.findUnique({
    where: { id },
    include: {
      cashSales: true,
    }
  });
}



export const createSale = async (data: SaleDTO) => {
  return await db.sale.create({
    data
  });
}


export const createCashSale = async (data: CashSaleDTO[]) => {
  return await db.cashSale.createMany({
    data
  });
}


