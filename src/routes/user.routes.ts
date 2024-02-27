import { Router } from "express";
import { getUsers, login, register, updateUser, validateToken } from "../controllers/user.controllers";

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/validate-token', validateToken)
router.get('/', getUsers)
router.put('/:id', updateUser)


export default router