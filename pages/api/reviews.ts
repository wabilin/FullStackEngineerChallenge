import type { NextApiRequest, NextApiResponse } from 'next'

import { ADMIN, EMPLOYEE } from 'utils/roles'
import getCurrentUser from 'utils/getCurrentUser'
import prisma from 'utils/prismaClient'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await getCurrentUser(req, res)

  switch(req.method) {
    case 'POST':
      if (currentUser?.role !== ADMIN) {
        res.status(403).end('Not allow.')
        return
      }

      const { userId, body } = req.body
      const { id } = await prisma.review.create({
        data: { userId, body }
      })

      res.status(201).json({ id })
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
