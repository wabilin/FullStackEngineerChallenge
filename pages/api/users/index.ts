import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

import { ADMIN, EMPLOYEE } from 'utils/roles'
import getCurrentUser from 'utils/getCurrentUser'
import prisma from 'utils/prismaClient'

const encrypt = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 12, function(err, hash) {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    });
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await getCurrentUser(req, res)
  switch(req.method) {
    case 'GET':
      const users = await prisma.user.findMany({ select: {
        id: true,
        username: true,
      }})
      res.status(200).json(users)
      break;
    case 'POST':
      if (currentUser?.role !== ADMIN) {
        res.status(403).end('Not allow.')
        return
      }

      const { body } = req

      const { username, password } = body
      if (!username || !password || password.length < 8) {
        res.status(400).json({ message: 'Invalid' })
        return
      }

      const hash = await encrypt(password)
      const { id } = await prisma.user.create({
        data: {
          username,
          passwordHash: hash,
          role: EMPLOYEE,
        }
      })

      res.status(201).json({ id })
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
