import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'
import bcrypt from 'bcrypt'
import prisma from 'utils/prismaClient'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { username, password } = req.body
  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new Error('Invalid params type')
  }

  try {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        passwordHash: true,
      },
      where: {
        username,
      }
    })

    const passed = await bcrypt.compare(password, user.passwordHash)
    if (passed) {
      const cookies = new Cookies(req, res)
      cookies.set('userId', user.id.toString(), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      res.status(200).json({ success: true })
    } else {
      res.status(401).json({ success: false })
    }
  } catch {
    res.status(401).json({ success: false })
  }
}
