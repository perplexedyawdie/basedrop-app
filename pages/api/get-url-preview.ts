import { urlPreviewData } from '@/utils/gmeta';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const { url } = req.body;
        const resp = await urlPreviewData(url)
        res.json({
            ...resp
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: true
        })
    }



}