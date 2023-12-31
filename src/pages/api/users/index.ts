// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/database";
// get
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const user = await prisma.users.findMany();

		return res.status(200).json( user );
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
}
