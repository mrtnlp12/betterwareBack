
import { Request, Response } from 'express';
import { createUser, getAllUsers, getUser, getUserById, update } from '../services/user.services';
import { createToken, verifyToken } from '../services/jwt.services';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }

}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await getUser(username);

    if (!user) {
      return res.status(404).json({ message: 'La contraseña o usuario no coinciden' });

    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'La contraseña o usuario no coinciden' });
    }

    const token = createToken({ id: user.id });

    return res.status(200).json({ token, role: user.role });

  } catch (error) {
    console.log(error);
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    const user = await getUser(username);

    if (user) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const newUser = await createUser({ username, password, role });

    return res.status(201).json({ message: 'Usuario creado', user: newUser });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const { username, password, role } = req.body;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'El usuario no existe' });
    }

    await update(id, { username, password, role });

    return res.status(200).json({ message: 'Usuario actualizado' });


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

export const validateToken = async (req: Request, res: Response) => {
  try {
    const token = req.header('x-token')

    if (!token) {
      return res.status(200).json({ ok: false, message: 'No hay token en la petición' });
    }

    const isValidToken = verifyToken(token);

    if (!isValidToken) {
      return res.status(200).json({ ok: false, message: 'Token no válido' });
    }

    return res.status(200).json({ ok: true, message: 'Token válido' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}