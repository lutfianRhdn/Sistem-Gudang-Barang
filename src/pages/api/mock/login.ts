import type { NextApiRequest, NextApiResponse } from 'next'
import { serializeCookie } from '@lib'
import prisma from '@lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password }:any = req.body
  try {
   const user = await prisma.users.findFirst({where:{ username,password}})
    if(!user) return res.status(400).json({ message: 'User not found' })
    const cookie = serializeCookie('user', {...user})
    return res.status(200)
      .setHeader('Set-Cookie', cookie)
      .json({ user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ login: false, error })
  }
}
