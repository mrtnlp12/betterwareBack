export type ProductDTO = {
  nombre: string;
  codigo_barras: string;
  stock_minimo: number;
  precio_venta: number;
  precio: number;
  cantidad: number;
  color?: string;
  tamano?: string;
  tipoProductoId: string;
};
