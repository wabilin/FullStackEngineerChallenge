import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res)
  cookies.set('userId', '')
  res.status(200).json({
    success: true,
  })
}
