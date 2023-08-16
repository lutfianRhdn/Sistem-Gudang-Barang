import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id,nama,jabatan,password,username } = req.body

    if (!id) {
      return res.status(400).json({ error: 'ID parameter is required' })
    }

    const user = await prisma.users.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        nama,
        password,
        username,
        jabatan,
      },
    })

    return res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
