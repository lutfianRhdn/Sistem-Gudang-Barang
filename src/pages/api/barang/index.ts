// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const barang = await prisma.barang.findMany({include:{kategori:true}})
    
        return res.status(200).json(barang)
      } catch (error) {
        console.error(error)
        return res.status(500).json({ error })
      }
    }