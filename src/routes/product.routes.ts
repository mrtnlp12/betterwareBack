import { Router } from "express";
import { createProduct, getProductById, getProducts, getTypes, update } from "../controllers/product.controller";

const router = Router()

router.get('/', getProducts)
router.get('/types', getTypes)
router.post('/', createProduct)

router.get('/:id', getProductById)
router.put('/:codigo_barras', update)


export default router
