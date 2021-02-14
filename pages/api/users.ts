import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import { EMPLOYEE } from 'utils/roles'

const prisma = new PrismaClient()

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
  switch(req.method) {
    case 'GET':
      const users = await prisma.user.findMany({ select: {
        id: true,
        username: true,
      }})
      res.status(200).json(users)
      break;
    case 'POST':
      const { body } = req
      console.log(body)
      throw new Error('Not Done Yet')

      const { username, password } = body
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
      res.status(405)
  }
}
