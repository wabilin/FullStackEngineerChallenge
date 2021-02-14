import type { NextApiRequest, NextApiResponse } from 'next'

import { ADMIN } from 'utils/roles'
import getCurrentUser from 'utils/getCurrentUser'
import prisma from 'utils/prismaClient'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await getCurrentUser(req, res)
  switch(req.method) {
    case 'GET':
      if (currentUser.role !== ADMIN) {
        res.status(403).end('Not allow.')
      }
      const reviewId = Number(req.query.reviewId)
      if (!reviewId) {
        res.status(400).end()
        return
      }
      const feedbacks = await prisma.feedback.findMany({
        where: { reviewId },
        include: {
          user: {
            select: { username: true }
          }
        }
      })
      res.status(200).json(feedbacks)
      break
    case 'POST':
      const ids = {
        userId: currentUser.id,
        reviewId: req.body.reviewId,
      }
      const feedbackRequest = await prisma.feedbackRequest.findFirst({ where: ids })
      if (!feedbackRequest || feedbackRequest.finished) {
        res.status(403).end('Not allow.')
        return
      }

      await prisma.$transaction([
        prisma.feedback.create({
          data: {
            ...ids,
            body: req.body.feedback,
          }
        }),
        prisma.feedbackRequest.update({
          where: {
            userId_reviewId: ids,
          },
          data: {
            finished: true,
          }
        }),
      ])

      res.status(201).end()

      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
