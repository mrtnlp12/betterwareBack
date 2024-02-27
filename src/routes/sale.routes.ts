import { Router } from "express";
import { getAll, getOne, postCashSale } from "../controllers/sale.controller";

const router = Router();


router.get('/', getAll)
router.post('/cash', postCashSale)
router.get('/:id', getOne)




export default router