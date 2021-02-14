import type { NextApiRequest, NextApiResponse } from 'next'
import getCurrentUser from 'utils/getCurrentUser'
import { ROLE_TABLE } from 'utils/roles'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getCurrentUser(req, res)
  if (!user) {
    res.status(401).json({})
    return
  }

  const {
    id,
    username,
    role,
  } = user

  res.status(200).json({
    id,
    username,
    role: ROLE_TABLE[role],
  })
}
