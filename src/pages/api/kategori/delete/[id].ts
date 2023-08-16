import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: 'ID parameter is required' })
    }

    const deletedProduct = await prisma.kategori.delete({
      where: {
        id: parseInt(id as string, 10),
      },
    }) 

    return res.status(200).json({ deletedProduct })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
