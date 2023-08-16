import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { jumlah, status, id_barang, user_id,nama_penerima }:any = req.body
    const masuk = await prisma.barangkeluar.create({
      data: {
        tanggal : new Date(),
        jumlah,
        status,
        id_barang,
        user_id,
        nama_penerima
      },
    })
    console.log(req.body);
    const barang = await prisma.barang.update({
        where:
        {id:id_barang,},
        data:{jumlah:{decrement:+jumlah|| 0}}
    })
    return res.status(200).json({ masuk })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
