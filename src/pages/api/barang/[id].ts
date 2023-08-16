import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: 'ID parameter is required' })
    }

    const product = await prisma.barang.findUnique({
      where: {
        id: parseInt(id as string, 10),
      },
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    return res.status(200).json(product)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
