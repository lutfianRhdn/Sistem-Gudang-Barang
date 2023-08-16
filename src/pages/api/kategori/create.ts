import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {nama} = req.body
        console.log(req.body)
        const product = await prisma.kategori.create({
          data: {
            nama
          }
      })

    return res.status(200).json({ product })
  } catch (error) {
    console.error(error)
    return res.status(500).json({  error })
  }
}
