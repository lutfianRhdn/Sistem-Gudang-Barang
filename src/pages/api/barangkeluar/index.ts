import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const barangkeluar = await prisma.barangkeluar.findMany({select:
        {user:true,barang:true,tanggal:true,status:true,nama_penerima:true,jumlah:true}})

    return res.status(200).json(barangkeluar )
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
