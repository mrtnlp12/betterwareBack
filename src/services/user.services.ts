
import db from '../config/db'
import { UserDTO } from '../dtos/user'

export const getUser = async (username: string) => {
  return await db.user.findUnique({
    where: { username }
  })
}

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id }
  })

}

export const createUser = async (data: UserDTO) => {
  return await db.user.create({
    data
  })
}

export const update = async (id: string, data: UserDTO) => {
  return await db.user.update({
    where: { id },
    data
  })

}

export const getAllUsers = async () => {
  return await db.user.findMany()
}

