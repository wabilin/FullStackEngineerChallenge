
import type { NextApiRequest, NextApiResponse } from 'next'

import { ADMIN } from 'utils/roles'
import getCurrentUser from 'utils/getCurrentUser'
import prisma from 'utils/prismaClient'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await getCurrentUser(req, res)

  switch(req.method) {
    case 'GET':
      const requests = await prisma.feedbackRequest.findMany({
        where: {
          userId: currentUser.id,
          finished: false,
        }
      })
      res.status(200).json(requests)
      break;
    case 'POST':
      if (currentUser?.role !== ADMIN) {
        res.status(403).end('Not allow.')
        return
      }

      const { userId, reviewId } = req.body
      await prisma.feedbackRequest.create({
        data: {
          userId: parseInt(userId, 10),
          reviewId: parseInt(reviewId, 10),
          finished: false,
        }
      })

      res.status(201).end()
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
