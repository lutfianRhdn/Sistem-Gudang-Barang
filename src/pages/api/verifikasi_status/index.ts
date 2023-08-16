import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const verifikasiKualitas = await prisma.pemeriksaan.findMany({select:{user:true,barang:true,tanggal:true,status:true}})

    return res.status(200).json({ verifikasiKualitas })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
