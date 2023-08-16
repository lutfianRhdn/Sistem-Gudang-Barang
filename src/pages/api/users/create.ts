import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/database";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { nama, jabatan, username, password } = req.body;
		console.log(req.body);
		const user = await prisma.users.create({
			data: {
				nama,
				jabatan,
				username,
				password,
			},
		});

		return res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
}
