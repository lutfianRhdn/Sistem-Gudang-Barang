import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { nama,lokasi,kode,kategori_id } = req.body
        console.log(req.body)
        const product = await prisma.barang.create({
          data: {
            nama,
            jumlah:0,
            lokasi, 
            kode,
            kategori_id:+kategori_id
          }
      })

    return res.status(200).json({ product })
  } catch (error) {
    console.error(error)
    return res.status(500).json({  error })
  }
}
