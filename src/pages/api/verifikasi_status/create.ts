import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { status, id_barang,user_id } = req.body

    const verifikasiKualitas = await prisma.pemeriksaan.create({
      data: {
        status,
        tanggal : new Date(),
        id_barang,
        user_id,
      },
    })

    return res.status(200).json({ verifikasiKualitas })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
