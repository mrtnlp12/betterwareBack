export type CashSaleDTO = {
  id_venta: string;
  id_producto: string;
  cantidad: number;
}


export type SaleDTO = {
  fecha: Date;
  total: number;
}

export type CreditSaleDTO = {
  id_venta: string;
  id_cliente: string;
  id_producto: string;
  cantidad: number;
}

