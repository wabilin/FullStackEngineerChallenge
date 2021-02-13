import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const users = [
    { name: 'John Doe' }
  ]

  res.status(200).json(users)
}
