import type { NextApiRequest, NextApiResponse } from 'next'

import { ADMIN, EMPLOYEE } from 'utils/roles'
import getCurrentUser from 'utils/getCurrentUser'
import prisma from 'utils/prismaClient'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await getCurrentUser(req, res)

  const { userId } = req.body
  switch(req.method) {
    case 'GET':
      const reviews = await prisma.review.findMany({
        where: { userId }
      })

      res.status(200).json(reviews)
      break;
    case 'POST':
      if (currentUser?.role !== ADMIN) {
        res.status(403).end('Not allow.')
        return
      }

      const { body } = req.body
      const { id } = await prisma.review.create({
        data: { userId, body }
      })

      res.status(201).json({ id })
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
