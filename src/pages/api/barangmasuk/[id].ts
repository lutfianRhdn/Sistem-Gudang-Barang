import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: 'id_barang parameter is required' })
    }

    const barangMasuk = await prisma.barangmasuk.findMany({
      where: {
        id_barang: parseInt(id as string, 10),
      },
      select: {
        user: true,
        barang: true,
        tanggal: true,
        status: true,
        nama_pemasok: true,
        jumlah: true,
      },
    })

    return res.status(200).json( barangMasuk )
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
