import type { NextApiRequest, NextApiResponse } from 'next'

import { ADMIN } from 'utils/roles'
import getCurrentUser from 'utils/getCurrentUser'
import prisma from 'utils/prismaClient'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await getCurrentUser(req, res)
  const { query, method } = req

  const id = Number(query.id)
  if (!id) {
      res.status(400).end()
      return;
  }

  switch(method) {
    case 'GET':
      const review = await prisma.review.findFirst({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            }
          },
        }
      })

      res.status(200).json(review)
      break;

    case 'PUT':
      if (currentUser?.role !== ADMIN) {
        res.status(403).end('Not allow.')
        return
      }
      const { body } = req.body
      const updated = await prisma.review.update({
        where: { id },
        data: { body }
      })
      res.status(200).json(updated)
      break;

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
