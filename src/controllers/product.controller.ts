import { Request, Response } from 'express';
import { ProductDTO } from '../dtos/product';
import { getProduct, registerProduct, listProducts, updateProduct, listTypes } from '../services/product.services';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { codigo_barras, nombre, cantidad, precio, stock_minimo, color, tamano, precio_venta, tipoProductoId } = req.body as ProductDTO;

    const product = await getProduct(codigo_barras);

    if (product) {
      return res.status(400).json({ message: 'El producto ya existe' });
    }

    const newProduct = await registerProduct({ codigo_barras, nombre, cantidad, precio, stock_minimo, color, tamano, precio_venta, tipoProductoId });

    return res.status(201).json({ message: 'Producto creado', product: newProduct });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await listProducts();

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { codigo_barras } = req.params as { codigo_barras: string };

    const product = await getProduct(codigo_barras);

    if (!product) {
      return res.status(404).json({ message: 'El producto no existe' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { codigo_barras } = req.params as { codigo_barras: string };
    console.log(codigo_barras);

    const { nombre, precio, cantidad, stock_minimo, color, tamano, precio_venta, tipoProductoId } = req.body;

    const product = await getProduct(codigo_barras);

    if (!product) {
      return res.status(404).json({ message: 'El producto no existe' });
    }

    await updateProduct(codigo_barras, { nombre, precio, cantidad, stock_minimo, codigo_barras, color, tamano, precio_venta, tipoProductoId });

    return res.status(200).json({ message: 'Producto actualizado' });


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

export const getTypes = async (req: Request, res: Response) => {
  try {
    const types = await listTypes();

    return res.status(200).json(types);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}