import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res)
  const savedValue = cookies.get('testCookies')
  cookies.set('testCookies', 'success', {
    httpOnly: true,
  })
  res.status(200).json({
    savedValue,
    success: true,
  })
}
