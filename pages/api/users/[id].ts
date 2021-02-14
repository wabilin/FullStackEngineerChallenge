import type { NextApiRequest, NextApiResponse } from 'next'
import getCurrentUser from 'utils/getCurrentUser'
import { ADMIN } from 'utils/roles'
import prisma from 'utils/prismaClient'

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { id }, method } = req
  const currentUser = await getCurrentUser(req, res)

  if (currentUser.role !== ADMIN) {
    res.status(403).end('Not allow.')
    return
  }

  if (typeof id !== 'string') {
    throw new Error('Unexpected type')
  }

  switch (method) {
    case 'GET':
      const user = await prisma.user.findFirst({
        select: { id: true, username: true },
        where: { id: parseInt(id, 10) }
      })
      res.status(200).json(user)
      break
    case 'DELETE':
      await prisma.user.delete({
        where: { id: parseInt(id, 10) }
      })
      res.status(200).json({ id })
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
