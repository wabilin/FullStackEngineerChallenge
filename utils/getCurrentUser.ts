import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'
import prisma from 'utils/prismaClient'

export default async function getCurrentUser(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res)
  const userIdStr = cookies.get('userId')
  if (!userIdStr) {
    return null
  }

  const userId = parseInt(userIdStr, 10)
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    }
  })
  return user
}
