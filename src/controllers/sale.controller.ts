import { Request, Response } from "express";
import { createCashSale, createSale, getSale, getSales } from "../services/sale.services";
import { CashSaleDTO } from "../dtos/sale";
import { decreaseStock } from "../services/product.services";


export const getAll = async (req: Request, res: Response) => {
  try {
    const sales = await getSales();
    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
  }
}
export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const sale = await getSale(id);
    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
  }
}
export const postCashSale = async (req: Request, res: Response) => {
  try {
    const { fecha, total, productos } = req.body;

    const sale = await createSale({ fecha, total });

    const cashSale: CashSaleDTO[] = productos.map((producto: any) => {
      return {
        id_venta: sale.id,
        id_producto: producto.id_producto,
        cantidad: parseInt(producto.cantidad)
      }
    });


    await createCashSale(cashSale);
    await decreaseStock(cashSale);

    return res.status(201).json({ message: 'Venta hecha' });


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

