// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'
// get
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const category = await prisma.kategori.findMany({ include: { _count: { select: { barang: true } } } })
    
        return res.status(200).json(category );
      } catch (error) {
        console.error(error)
        return res.status(500).json({ error })
      }
    }