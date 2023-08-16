import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const barangMasuk = await prisma.barangmasuk.findMany({select:
        {user:true,barang:true,tanggal:true,status:true,nama_pemasok:true,jumlah:true}})

    return res.status(200).json({ barangMasuk })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
